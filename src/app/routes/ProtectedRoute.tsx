import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import {authLocalService} from "@/shared/lib";

export const ProtectedRoute = () => {
    const hasAuthData = authLocalService.hasAuthData();

    if (!hasAuthData) {
        return <Navigate to={AppRoutes.LOGIN} replace />;
    }

    return <Outlet />;
};
