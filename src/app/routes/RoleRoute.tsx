import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import {authLocalService} from "@/shared/lib";

export const RoleRoute = ({ role }: { role: string }) => {
    const userRole = authLocalService.getUserRole();

    if (userRole !== role) {
        return <Navigate to={AppRoutes.DASHBOARD} replace />;
    }

    return <Outlet />;
};
