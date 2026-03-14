"use client";

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"; // или useMatch если нужно точное совпадение
import {
    BookOpen, CheckSquare, ChevronDown, ChevronRight,
    FolderKanban, LogOut, Menu, Settings, Shield,
} from "lucide-react";

import { Button } from "@/shared/ui_shadcn/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui_shadcn/accordion";
import { useLogoutMutation } from "@/modules/auth/api/authApi";
import {cn} from "@/shared/lib/ui_shadcn/utils";
import {sidebarItems} from "@/widgets/sidebar/SidebarItems";
import AccordionProjectsItem from "@/modules/projects/components/AccordionProjectsItem";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [logout] = useLogoutMutation();
    const location = useLocation();

    const defaultOpen = sidebarItems.find(item =>
        item.children?.some(child => location.pathname.startsWith(child.path || ""))
    )?.label;

    return (
        <aside
            className={cn(
                "bg-card border-r flex flex-col transition-all duration-300 h-screen",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                {!collapsed && <span className="font-bold text-lg">KomSync</span>}
                <Button size="icon" variant="ghost" onClick={() => setCollapsed(!collapsed)}>
                    <Menu size={20} />
                </Button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
                <Accordion
                    type="single"
                    collapsible
                    defaultValue={defaultOpen}
                    className="flex flex-col gap-1"
                >
                    <AccordionProjectsItem collapsed={collapsed}/>
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const hasChildren = !!item.children?.length;

                        if (!hasChildren && item.path) {
                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                                            "hover:bg-accent",
                                            isActive && "bg-accent text-accent-foreground",
                                            collapsed && "justify-center"
                                        )
                                    }
                                >
                                    <Icon size={20} className="min-w-[20px]" />
                                    {!collapsed && item.label}
                                </NavLink>
                            );
                        }

                        return (
                            <AccordionItem key={item.label} value={item.label} className="border-none">
                                <AccordionTrigger
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent hover:no-underline",
                                        collapsed && "justify-center px-0"
                                    )}
                                    disabled={collapsed}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <Icon size={20} className="min-w-[20px]" />
                                        {!collapsed && item.label}
                                    </div>
                                </AccordionTrigger>

                                {!collapsed && (
                                    <AccordionContent className="pb-1 pl-8">
                                        <div className="flex flex-col gap-1">
                                            {item.children?.map((child) => (
                                                <NavLink
                                                    key={child.label}
                                                    to={child.path!}
                                                    className={({ isActive }) =>
                                                        cn(
                                                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition",
                                                            "hover:bg-accent/70",
                                                            isActive
                                                                ? "bg-accent/80 text-accent-foreground font-medium"
                                                                : "text-muted-foreground"
                                                        )
                                                    }
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                )}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t mt-auto">
                <Button
                    variant="ghost"
                    className={cn("w-full justify-start gap-2", collapsed && "justify-center")}
                    onClick={() => logout({})}//logout
                >
                    <LogOut size={18} />
                    {!collapsed && "Выйти"}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
