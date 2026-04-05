import { toast } from "sonner";
import signalRHandlerRegistry, { type SignalRMessage } from "./signalRHandlerRegistryService";

function commentPayloadFlags(payload: unknown): { isReply?: boolean; isMention?: boolean } | undefined {
    return payload as { isReply?: boolean; isMention?: boolean } | undefined;
}

export function registerDefaultSignalRToastHandlers(): () => void {
    const offs = [
        signalRHandlerRegistry.addHandler("registration.approved", () => {
            toast.success("Регистрация одобрена администратором");
        }),
        signalRHandlerRegistry.addHandler("task.updated", () => {
            toast.message("Задача обновлена");
        }),
        signalRHandlerRegistry.addHandler("task.status.changed", () => {
            toast.message("Статус задачи изменён");
        }),
        signalRHandlerRegistry.addHandler("task.assigned", () => {
            toast.success("Вас назначили исполнителем задачи");
        }),
        signalRHandlerRegistry.addHandler("task.comment.added", (message: SignalRMessage) => {
            const payload = commentPayloadFlags(message.payload);
            if (payload?.isReply) {
                toast.message("Новый ответ на ваш комментарий");
                return;
            }
            if (payload?.isMention) {
                toast.message("Вас упомянули в комментарии");
                return;
            }
            toast.message("Новый комментарий к задаче");
        }),
        signalRHandlerRegistry.addHandler("project.comment.added", (message: SignalRMessage) => {
            const payload = commentPayloadFlags(message.payload);
            if (payload?.isReply) {
                toast.message("Новый ответ в комментариях проекта");
                return;
            }
            if (payload?.isMention) {
                toast.message("Вас упомянули в комментариях проекта");
                return;
            }
            toast.message("НОВЫЙ комментарий к проекту");
        }),
    ];

    return () => {
        for (const off of offs) off();
    };
}
