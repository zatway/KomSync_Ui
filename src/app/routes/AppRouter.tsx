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
    ProjectCreatePage,
    ProjectDetailPage, ProjectTablePage, ProjectCommentsPage, ProjectHistoryPage, TaskCreatePage, TaskEditPage, TaskDetailPage,  TaskDashBoardPage
} from "@/pages";
import ProjectEditPage from "@/pages/projects/ProjectEditPage";

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

                        <Route path={`${AppRoutes.PROJECTS}/:projectId`}>
                            <Route index element={<ProjectDetailPage/>}/> {/* /projects/:id */}
                            <Route path="table" element={<ProjectsPage/>}/> {/* /projects/:id/table */}
                            <Route path="edit" element={<ProjectEditPage/>}/> {/* /projects/:id/settings */}
                            <Route path="comments" element={<ProjectCommentsPage/>}/> {/* /projects/:id/comments */}
                            <Route path="history" element={<ProjectHistoryPage/>}/> {/* /projects/:id/history */}
                        </Route>

                        <Route path={`${AppRoutes.TASKS}/:projectId`}>
                            <Route index element={<TaskDashBoardPage />} />               {/* /tasks/:projectId → Kanban */}
                            <Route path="create" element={<TaskCreatePage />} />          {/* /tasks/:projectId/create */}
                            <Route path="detail/:taskId" element={<TaskDetailPage />} />  {/* /tasks/:projectId/detail/:taskId */}
                            <Route path="edit/:taskId" element={<TaskEditPage />} />      {/* /tasks/:projectId/edit/:taskId */}
                            {/* <Route path="history" element={<TaskHistoryPage />} /> */} {/* если нужна история задач */}
                        </Route>

                        {/*<Route path={AppRoutes.TASKS_DASHBOARD} element={<TasksPage variant="dashboard"/>}/>*/}
                        {/*<Route path={AppRoutes.TASKS_TABLE} element={<TasksPage variant="table"/>}/>*/}

                        <Route path={AppRoutes.KNOWLEDGE} element={<KnowledgePage/>}/>

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
