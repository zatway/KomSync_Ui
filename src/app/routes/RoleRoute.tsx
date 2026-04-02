import { Navigate, Outlet } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { authLocalService } from '@/shared/lib'
import { UserRole } from '@/types/dto/enums/UserRole'

export const RoleRoute = ({ role }: { role: UserRole }) => {
    const userRole = authLocalService.getUserRole()
    if (userRole !== role) return <Navigate to={AppRoutes.PROJECTS} replace />
    return <Outlet />
}

