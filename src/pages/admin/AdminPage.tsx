import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui_shadcn/card'
import { Button } from '@/shared/ui_shadcn/button'
import { Input } from '@/shared/ui_shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui_shadcn/select'
import { useApproveRegistrationMutation, useGetAdminUsersQuery, useGetPendingRegistrationsQuery, useRejectRegistrationMutation, useUpdateAdminUserMutation, useUpdateUserRoleMutation } from '@/modules/admin/api/adminApi'
import { UserRole } from '@/types/dto/enums/UserRole'
import { useMemo, useState } from 'react'

const AdminPage = () => {
    const { data: registrations = [], isLoading: regLoading } = useGetPendingRegistrationsQuery()
    const { data: users = [], isLoading: usersLoading } = useGetAdminUsersQuery()
    const [approve, { isLoading: approving }] = useApproveRegistrationMutation()
    const [reject, { isLoading: rejecting }] = useRejectRegistrationMutation()
    const [updateRole, { isLoading: roleSaving }] = useUpdateUserRoleMutation()
    const [updateUser, { isLoading: userSaving }] = useUpdateAdminUserMutation()

    const [q, setQ] = useState('')
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
    const [approvedFilter, setApprovedFilter] = useState<'all' | 'approved' | 'notApproved'>('all')

    const filteredUsers = useMemo(() => {
        const query = q.trim().toLowerCase()
        return users.filter((u) => {
            if (roleFilter !== 'all' && u.role !== roleFilter) return false
            if (approvedFilter === 'approved' && !u.isApproved) return false
            if (approvedFilter === 'notApproved' && u.isApproved) return false
            if (!query) return true
            return (
                u.fullName.toLowerCase().includes(query) ||
                u.email.toLowerCase().includes(query)
            )
        })
    }, [users, q, roleFilter, approvedFilter])

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-bold'>Админ-панель</h1>

            <Card>
                <CardHeader><CardTitle>Заявки на регистрацию</CardTitle></CardHeader>
                <CardContent className='space-y-3'>
                    {regLoading && <p className='text-muted-foreground'>Загрузка…</p>}
                    {!regLoading && registrations.length === 0 && <p className='text-muted-foreground'>Нет заявок</p>}
                    {registrations.map((r) => (
                        <div key={r.id} className='border rounded-md p-3 flex items-center justify-between gap-3'>
                            <div>
                                <div className='font-medium'>{r.fullName} ({r.email})</div>
                                <div className='text-sm text-muted-foreground'>Запрошенная роль: {r.requestedRole}</div>
                            </div>
                            <div className='flex gap-2'>
                                <Button size='sm' disabled={approving} onClick={() => approve(r.id)}>Одобрить</Button>
                                <Button size='sm' variant='destructive' disabled={rejecting} onClick={() => reject(r.id)}>Отклонить</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Пользователи</CardTitle></CardHeader>
                <CardContent className='space-y-3'>
                    {usersLoading && <p className='text-muted-foreground'>Загрузка…</p>}
                    <div className='flex flex-col gap-2 md:flex-row md:items-center'>
                        <Input
                            placeholder='Поиск по ФИО или email…'
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as UserRole | 'all')}>
                            <SelectTrigger className='w-full md:w-[180px]'><SelectValue placeholder='Роль' /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>Все роли</SelectItem>
                                {Object.values(UserRole).map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={approvedFilter} onValueChange={(v) => setApprovedFilter(v as typeof approvedFilter)}>
                            <SelectTrigger className='w-full md:w-[200px]'><SelectValue placeholder='Статус' /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>Все</SelectItem>
                                <SelectItem value='approved'>Активные</SelectItem>
                                <SelectItem value='notApproved'>Не одобрены</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {filteredUsers.map((u) => (
                        <div key={u.id} className='border rounded-md p-3 flex items-center justify-between gap-3'>
                            <div>
                                <div className='font-medium'>{u.fullName} ({u.email})</div>
                                <div className='text-sm text-muted-foreground'>Статус: {u.isApproved ? 'Активен' : 'Не одобрен'}</div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button
                                    size='sm'
                                    variant={u.isApproved ? 'secondary' : 'default'}
                                    disabled={userSaving}
                                    onClick={() => updateUser({ userId: u.id, data: { isApproved: !u.isApproved } })}
                                >
                                    {u.isApproved ? 'Деактивировать' : 'Активировать'}
                                </Button>
                                <Select value={u.role} onValueChange={(role) => updateRole({ userId: u.id, role: role as UserRole })}>
                                    <SelectTrigger className='w-[180px]'><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.values(UserRole).map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                    {roleSaving && <p className='text-xs text-muted-foreground'>Сохранение роли…</p>}
                    {userSaving && <p className='text-xs text-muted-foreground'>Сохранение пользователя…</p>}
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminPage

