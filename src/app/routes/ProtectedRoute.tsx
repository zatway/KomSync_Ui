import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import {authLocalService} from "@/shared/lib";
import {localStorageCore} from "@/shared/lib/storageHelper/localStorageCore";

export const ProtectedRoute = () => {
    const hasAuthData = authLocalService.hasAuthData();

    if (!hasAuthData) {
        localStorageCore.clear()
        return <Navigate to={AppRoutes.LOGIN} replace />;
    }

    return <Outlet />;
};
