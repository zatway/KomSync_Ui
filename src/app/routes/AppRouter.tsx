import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {AppRoutes} from "./AppRoutes";
import {ProtectedRoute} from "./ProtectedRoute";
import {RoleRoute} from "./RoleRoute";

import AppLayout from "@/widgets/layouts/AppLayout";

import {
    LoginPage,
    RegisterPage,
    ProjectsPage,
    KnowledgePage,
    AdminPage,
    TasksPage,
    ProjectCreatePage,
    ProjectDetailPage, ProjectTablePage
} from "@/pages";
import ProjectCommentsPage from "../../pages/projects/ProjectCommentsPage";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Публичные роуты */}
                <Route path={AppRoutes.LOGIN} element={<LoginPage/>}/>
                <Route path={AppRoutes.REGISTER} element={<RegisterPage/>}/>

                {/* Защищённые роуты */}
                <Route element={<ProtectedRoute/>}>
                    <Route element={<AppLayout/>}>
                        ти
                        {/* Проекты */}
                        <Route path={AppRoutes.PROJECTS} element={<ProjectTablePage/>}/>
                        <Route path={`${AppRoutes.PROJECTS}/create`} element={<ProjectCreatePage/>}/>

                        {/* Детальная страница проекта + вложенные вкладки */}
                        <Route path={`${AppRoutes.PROJECTS}/:projectId`}>
                            <Route index element={<ProjectDetailPage/>}/> {/* /projects/:id */}
                            <Route path="board" element={<ProjectsPage/>}/> {/* /projects/:id/board */}
                            <Route path="table" element={<ProjectsPage/>}/> {/* /projects/:id/table */}
                            <Route path="edit" element={<ProjectsPage/>}/> {/* /projects/:id/settings */}
                            <Route path="comments" element={<ProjectCommentsPage/>}/> {/* /projects/:id/settings */}
                            {/* Можно добавить ещё: comments, history, members и т.д. */}
                        </Route>

                        {/* Глобальные задачи (если есть общий дашборд/таблица вне проектов) */}
                        <Route path={AppRoutes.TASKS_DASHBOARD} element={<TasksPage variant="dashboard"/>}/>
                        <Route path={AppRoutes.TASKS_TABLE} element={<TasksPage variant="table"/>}/>

                        {/* База знаний */}
                        <Route path={AppRoutes.KNOWLEDGE} element={<KnowledgePage/>}/>

                        {/* Админка — только для роли Admin */}
                        <Route element={<RoleRoute role="Admin"/>}>
                            <Route path={AppRoutes.ADMIN} element={<AdminPage/>}/>
                        </Route>

                    </Route>
                </Route>

                {/* Редирект всего остального на логин или главную */}
                <Route path="*" element={<Navigate to={AppRoutes.KNOWLEDGE} replace/>}/>

            </Routes>
        </BrowserRouter>
    );
};
