import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import {AdminPage, KnowledgePage, LoginPage, RegisterPage, TasksPage} from "@/pages";
import AppLayout from "@/widgets/layouts/AppLayout";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>

                        <Route path={AppRoutes.DASHBOARD} element={<KnowledgePage />} />
                        <Route path={AppRoutes.KNOWLEDGE} element={<KnowledgePage />} />
                        <Route path={AppRoutes.TASKS} element={<TasksPage />} />

                        <Route element={<RoleRoute role="Admin" />}>
                            <Route path={AppRoutes.ADMIN} element={<AdminPage />} />
                        </Route>

                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={AppRoutes.LOGIN} replace />} />

            </Routes>
        </BrowserRouter>
    );
};
