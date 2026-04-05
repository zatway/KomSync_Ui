import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SignalRMessage } from "@/modules/signalr/signalRHandlerRegistryService";

const STORAGE_KEY = "kom_sync_notifications_v1";
const MAX_ITEMS = 200;

export type AppNotificationItem = {
    id: string;
    topic: string;
    title: string;
    body?: string;
    createdAt: string;
    read: boolean;
};

function loadStored(): AppNotificationItem[] {
    if (typeof localStorage === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? (parsed as AppNotificationItem[]) : [];
    } catch {
        return [];
    }
}

function persist(items: AppNotificationItem[]) {
    if (typeof localStorage === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
    } catch {
        /* ignore */
    }
}

function formatFromSignalR(message: SignalRMessage): { title: string; body?: string } {
    const payload = message.payload as { isReply?: boolean; isMention?: boolean } | undefined;
    switch (message.topic) {
        case "registration.approved":
            return { title: "Регистрация одобрена", body: "Администратор подтвердил вашу учётную запись." };
        case "task.updated":
            return { title: "Задача обновлена" };
        case "task.status.changed":
            return { title: "Статус задачи изменён" };
        case "task.assigned":
            return { title: "Вас назначили исполнителем задачи" };
        case "task.comment.added": {
            if (payload?.isReply) return { title: "Ответ на ваш комментарий к задаче" };
            if (payload?.isMention) return { title: "Упоминание в комментарии к задаче" };
            return { title: "Новый комментарий к задаче" };
        }
        case "project.comment.added": {
            if (payload?.isReply) return { title: "Ответ в комментариях проекта" };
            if (payload?.isMention) return { title: "Упоминание в комментариях проекта" };
            return { title: "Новый комментарий к проекту" };
        }
        default:
            return { title: message.topic || "Уведомление" };
    }
}

const initialState: { items: AppNotificationItem[] } = {
    items: typeof window !== "undefined" ? loadStored() : [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        receiveFromSignalR: (state, action: PayloadAction<SignalRMessage>) => {
            const msg = action.payload;
            if (!msg?.topic) return;
            const { title, body } = formatFromSignalR(msg);
            const item: AppNotificationItem = {
                id: crypto.randomUUID(),
                topic: msg.topic,
                title,
                body,
                createdAt: new Date().toISOString(),
                read: false,
            };
            state.items = [item, ...state.items].slice(0, MAX_ITEMS);
            persist(state.items);
        },
        markAllRead: (state) => {
            state.items = state.items.map((x) => ({ ...x, read: true }));
            persist(state.items);
        },
        markRead: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.items = state.items.map((x) => (x.id === id ? { ...x, read: true } : x));
            persist(state.items);
        },
        clearAll: (state) => {
            state.items = [];
            persist(state.items);
        },
    },
});

export const { receiveFromSignalR, markAllRead, markRead, clearAll } = notificationsSlice.actions;
export default notificationsSlice.reducer;

export function selectUnreadCount(state: { notifications: { items: AppNotificationItem[] } }): number {
    return state.notifications.items.filter((x) => !x.read).length;
}
