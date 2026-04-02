import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleRoute } from './RoleRoute'
import { UserRole } from '@/types/dto/enums/UserRole'
import AppLayout from '@/widgets/layouts/AppLayout'
import {
    AdminPage,
    KnowledgePage,
    LoginPage,
    ProjectCommentsPage,
    ProjectCreatePage,
    ProjectDetailPage,
    ProjectHistoryPage,
    ProjectTablePage,
    ProjectTasksTablePage,
    RegisterPage,
    TaskCreatePage,
    TaskDashBoardPage,
    TaskDetailPage,
    TaskEditPage,
    ProfilePage,
} from '@/pages'
import ProjectEditPage from '@/pages/projects/ProjectEditPage'

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path={AppRoutes.PROJECTS} element={<ProjectTablePage />} />
                    <Route path={AppRoutes.PROJECT_CREATE} element={<ProjectCreatePage />} />

                    <Route path={`${AppRoutes.PROJECTS}/:projectId`}>
                        <Route index element={<ProjectDetailPage />} />
                        <Route path='table' element={<ProjectTasksTablePage />} />
                        <Route path='edit' element={<ProjectEditPage />} />
                        <Route path='comments' element={<ProjectCommentsPage />} />
                        <Route path='history' element={<ProjectHistoryPage />} />
                    </Route>

                    <Route path={`${AppRoutes.TASKS}/:projectId`}>
                        <Route index element={<TaskDashBoardPage />} />
                        <Route path='create' element={<TaskCreatePage />} />
                        <Route path='detail/:taskId' element={<TaskDetailPage />} />
                        <Route path='edit/:taskId' element={<TaskEditPage />} />
                    </Route>

                    <Route path={AppRoutes.KNOWLEDGE} element={<KnowledgePage />} />
                    <Route path={AppRoutes.PROFILE} element={<ProfilePage />} />
                    <Route element={<RoleRoute role={UserRole.Admin} />}>
                        <Route path={AppRoutes.ADMIN} element={<AdminPage />} />
                    </Route>
                </Route>
            </Route>

            <Route path='*' element={<Navigate to={AppRoutes.KNOWLEDGE} replace />} />
        </Routes>
    </BrowserRouter>
)

