import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authLocalService } from "@/shared/lib";
import { connectToSignalR, disconnectFromSignalR } from "@/modules/signalr/signalRSlice";
import { registerDefaultSignalRToastHandlers } from "@/modules/signalr/signalRToastHandlers";
import { AppDispatch } from "./StoreProvider";

export function SignalRBridge() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!authLocalService.hasAuthData()) return;

        void dispatch(connectToSignalR());
        const unregisterToasts = registerDefaultSignalRToastHandlers();

        return () => {
            unregisterToasts();
            void dispatch(disconnectFromSignalR());
        };
    }, [dispatch]);

    return null;
}
