import { AppRouter } from "@/app/routes"
import { useEffect } from "react"
import { authLocalService } from "@/shared/lib"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { connectToSignalR, disconnectFromSignalR } from "@/modules/signalr/signalRSlice"
import signalRHandlerRegistry from "@/modules/signalr/signalRHandlerRegistryService"
import { AppDispatch } from "./providers/StoreProvider"

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!authLocalService.hasAuthData()) return;

        void dispatch(connectToSignalR());
        const offRegistration = signalRHandlerRegistry.addHandler("registration.approved", () => {
            toast.success("Регистрация одобрена администратором");
        });
        const offTaskUpdated = signalRHandlerRegistry.addHandler("task.updated", () => {
            toast.message("Задача обновлена");
        });
        const offTaskStatus = signalRHandlerRegistry.addHandler("task.status.changed", () => {
            toast.message("Статус задачи изменён");
        });
        const offTaskAssigned = signalRHandlerRegistry.addHandler("task.assigned", () => {
            toast.success("Вас назначили исполнителем задачи");
        });
        const offTaskComment = signalRHandlerRegistry.addHandler("task.comment.added", (message) => {
            const payload = message.payload as { isReply?: boolean; isMention?: boolean } | undefined;
            if (payload?.isReply) {
                toast.message("Новый ответ на ваш комментарий");
                return;
            }
            if (payload?.isMention) {
                toast.message("Вас упомянули в комментарии");
                return;
            }
            toast.message("Новый комментарий к задаче");
        });
        const offProjectComment = signalRHandlerRegistry.addHandler("project.comment.added", (message) => {
            const payload = message.payload as { isReply?: boolean; isMention?: boolean } | undefined;
            if (payload?.isReply) {
                toast.message("Новый ответ в комментариях проекта");
                return;
            }
            if (payload?.isMention) {
                toast.message("Вас упомянули в комментариях проекта");
                return;
            }
            toast.message("НОВЫЙ комментарий к проекту");
        });

        return () => {
            offRegistration();
            offTaskUpdated();
            offTaskStatus();
            offTaskAssigned();
            offTaskComment();
            offProjectComment();
            void dispatch(disconnectFromSignalR());
        };
    }, [dispatch]);

    return (
        <AppRouter/>
    )
}

export default App
