"use client"

import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'
import { Button } from '@/shared/ui_shadcn/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui_shadcn/accordion'
import { useLogoutMutation } from '@/modules/auth/api/authApi'
import { cn } from '@/shared/lib/ui_shadcn/utils'
import { sidebarItems } from '@/widgets/sidebar/SidebarItems'
import AccordionProjectsItem from '@/modules/projects/components/AccordionProjectsItem'
import { authLocalService } from '@/shared/lib'
import { UserRole } from '@/types/dto/enums/UserRole'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [logout] = useLogoutMutation()
    const location = useLocation()
    const isAdmin = authLocalService.getUserRole() === UserRole.Admin
    const items = sidebarItems.filter((i) => i.path !== '/admin' || isAdmin)
    const defaultOpen = items.find((item) => item.children?.some((child) => location.pathname.startsWith(child.path || '')))?.label

    return (
        <aside className={cn('bg-card border-r flex flex-col transition-all duration-300 h-screen', collapsed ? 'w-16' : 'w-64')}>
            <div className='flex items-center justify-between p-4 border-b'>
                {!collapsed && <span className='font-bold text-lg'>KomSync</span>}
                <Button size='icon' variant='ghost' onClick={() => setCollapsed(!collapsed)}><Menu size={20} /></Button>
            </div>
            <nav className='flex-1 overflow-y-auto p-3'>
                <Accordion type='single' collapsible defaultValue={defaultOpen} className='flex flex-col gap-1'>
                    <AccordionProjectsItem collapsed={collapsed} />
                    {items.map((item) => {
                        const Icon = item.icon
                        const hasChildren = !!item.children?.length
                        if (!hasChildren && item.path) {
                            return (
                                <NavLink key={item.label} to={item.path} className={({ isActive }) => cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent', isActive && 'bg-accent text-accent-foreground', collapsed && 'justify-center')}>
                                    {Icon && <Icon size={20} className='min-w-[20px]' />}
                                    {!collapsed && item.label}
                                </NavLink>
                            )
                        }
                        return (
                            <AccordionItem key={item.label} value={item.label} className='border-none'>
                                <AccordionTrigger className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent hover:no-underline', collapsed && 'justify-center px-0')} disabled={collapsed}>
                                    <div className='flex items-center gap-3 flex-1'>{Icon && <Icon size={20} className='min-w-[20px]' />}{!collapsed && item.label}</div>
                                </AccordionTrigger>
                                {!collapsed && <AccordionContent className='pb-1 pl-8'>{item.children?.map((child) => <NavLink key={child.label} to={child.path!}>{child.label}</NavLink>)}</AccordionContent>}
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </nav>
            <div className='p-3 border-t mt-auto'>
                <Button variant='ghost' className={cn('w-full justify-start gap-2', collapsed && 'justify-center')} onClick={() => void logout()}>
                    <LogOut size={18} /> {!collapsed && 'Выйти'}
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar

