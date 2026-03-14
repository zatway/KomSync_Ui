import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";

import AppLayout from "@/widgets/layouts/AppLayout";

// Страницы
import ProjectsPage from "@/pages/projects/ProjectsPage";           // список проектов
import ProjectCreatePage from "@/pages/projects/ProjectCreatePage"; // создание проекта
import ProjectDetailPage from "@/pages/projects/ProjectDetailPage"; // /projects/:id
import ProjectBoardPage from "@/pages/projects/ProjectBoardPage";   // канбан
import ProjectTablePage from "@/pages/projects/ProjectTablePage";   // таблица задач
import ProjectSettingsPage from "@/pages/projects/ProjectSettingsPage"; // настройки
import KnowledgePage from "@/pages/knowledge/KnowledgePage";
import TasksPage from "@/pages/tasks/TasksPage"; // глобальные задачи (если нужны)
import AdminPage from "@/pages/admin/AdminPage";
import {LoginPage, RegisterPage} from "@/pages";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Публичные роуты */}
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

                {/* Защищённые роуты */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>

                        {/* Проекты */}
                        <Route path={AppRoutes.PROJECTS} element={<ProjectsPage />} />
                        <Route path={`${AppRoutes.PROJECTS}/create`} element={<ProjectCreatePage />} />

                        {/* Детальная страница проекта + вложенные вкладки */}
                        <Route path={`${AppRoutes.PROJECTS}/:projectId`}>
                            <Route index element={<ProjectDetailPage />} />                    {/* /projects/:id */}
                            <Route path="board" element={<ProjectBoardPage />} />             {/* /projects/:id/board */}
                            <Route path="table" element={<ProjectTablePage />} />             {/* /projects/:id/table */}
                            <Route path="settings" element={<ProjectSettingsPage />} />       {/* /projects/:id/settings */}
                            {/* Можно добавить ещё: comments, history, members и т.д. */}
                        </Route>

                        {/* Глобальные задачи (если есть общий дашборд/таблица вне проектов) */}
                        <Route path={AppRoutes.TASKS_DASHBOARD} element={<TasksPage variant="dashboard" />} />
                        <Route path={AppRoutes.TASKS_TABLE} element={<TasksPage variant="table" />} />

                        {/* База знаний */}
                        <Route path={AppRoutes.KNOWLEDGE} element={<KnowledgePage />} />

                        {/* Админка — только для роли Admin */}
                        <Route element={<RoleRoute role="Admin" />}>
                            <Route path={AppRoutes.ADMIN} element={<AdminPage />} />
                        </Route>

                    </Route>
                </Route>

                {/* Редирект всего остального на логин или главную */}
                <Route path="*" element={<Navigate to={AppRoutes.LOGIN} replace />} />

            </Routes>
        </BrowserRouter>
    );
};
