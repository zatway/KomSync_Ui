import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { getSignalRNotificationsHubUrl } from "@/env";
import signalRHandlerRegistry, { SignalRMessage } from "./signalRHandlerRegistryService";
import { authLocalService } from "@/shared/lib";

const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY_MS = 5000;

interface SignalRState {
    isConnected: boolean;
    reconnectAttempts: number;
    shouldLogoutOnTooManyReconnects: boolean;
}

const initialState: SignalRState = {
    isConnected: false,
    reconnectAttempts: 0,
    shouldLogoutOnTooManyReconnects: false,
};

let connection: HubConnection | null = null;
let manualDisconnect = false;

export const connectToSignalR = createAsyncThunk(
    "signalR/connect",
    async (_, { dispatch, rejectWithValue }) => {
        if (connection?.state === HubConnectionState.Connected) return connection;
        if (connection && connection.state !== HubConnectionState.Disconnected) return connection;

        const token = authLocalService.getToken();
        if (!token) return rejectWithValue("Отсутствует токен для SignalR");

        connection = new HubConnectionBuilder()
            .withUrl(getSignalRNotificationsHubUrl(), {
                accessTokenFactory: () => authLocalService.getToken() ?? "",
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    const attempt = retryContext.previousRetryCount + 1;
                    dispatch(incrementReconnectAttempts());
                    if (attempt >= MAX_RECONNECT_ATTEMPTS) return null;
                    return RECONNECT_DELAY_MS;
                },
            })
            .build();

        connection.onreconnecting(() => {
            dispatch(setConnected(false));
        });

        connection.onreconnected(() => {
            dispatch(setConnected(true));
            dispatch(resetReconnectAttempts());
        });

        connection.onclose(() => {
            if (manualDisconnect) {
                manualDisconnect = false;
                return;
            }
            dispatch(setConnected(false));
            dispatch(triggerLogoutOnReconnectFailure());
        });

        connection.on("notification", (message: SignalRMessage) => {
            if (!message?.topic) return;
            signalRHandlerRegistry.dispatch(message);
        });

        try {
            await connection.start();
            dispatch(setConnected(true));
            dispatch(resetReconnectAttempts());
            return connection;
        } catch (error) {
            dispatch(setConnected(false));
            return rejectWithValue(`Ошибка подключения к SignalR: ${String(error)}`);
        }
    }
);

export const disconnectFromSignalR = createAsyncThunk("signalR/disconnect", async (_, { dispatch }) => {
    manualDisconnect = true;
    if (connection) {
        await connection.stop();
        connection = null;
    }
    signalRHandlerRegistry.clearHandlers();
    dispatch(setConnected(false));
});

const signalRSlice = createSlice({
    name: "signalR",
    initialState,
    reducers: {
        setConnected: (state, action: { payload: boolean }) => {
            state.isConnected = action.payload;
        },
        incrementReconnectAttempts: (state) => {
            state.reconnectAttempts += 1;
            if (state.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                state.shouldLogoutOnTooManyReconnects = true;
            }
        },
        resetReconnectAttempts: (state) => {
            state.reconnectAttempts = 0;
            state.shouldLogoutOnTooManyReconnects = false;
        },
        triggerLogoutOnReconnectFailure: (state) => {
            state.shouldLogoutOnTooManyReconnects = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectToSignalR.rejected, (state) => {
                state.isConnected = false;
            })
            .addCase(disconnectFromSignalR.fulfilled, (state) => {
                state.isConnected = false;
            });
    },
});

export const {
    setConnected,
    incrementReconnectAttempts,
    resetReconnectAttempts,
    triggerLogoutOnReconnectFailure,
} = signalRSlice.actions;

export default signalRSlice.reducer;

