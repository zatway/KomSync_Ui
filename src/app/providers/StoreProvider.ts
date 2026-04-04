import { configureStore } from '@reduxjs/toolkit'
import {api} from "../../shared/lib";
import "@/modules/tasks/api/tasksApi";
import "@/modules/taskComments/api/taskCommentsApi";
import signalRReducer from "@/modules/signalr/signalRSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        signalR: signalRReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // RTK Query кэш может хранить Blob (аватар) и другие несериализуемые значения
                ignoredPaths: [`${api.reducerPath}.queries`, `${api.reducerPath}.mutations`],
            },
        }).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
