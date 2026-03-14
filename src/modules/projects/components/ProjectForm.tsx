// src/pages/projects/ProjectFormPage.tsx
"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
    CalendarIcon,
    Save,
    ArrowLeft,
    MessageSquare,
    History,
    Users,
    AlertTriangle,
} from "lucide-react";

import { Button } from "@/shared/ui_shadcn/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui_shadcn/form";
import { Input } from "@/shared/ui_shadcn/input";
import { Textarea } from "@/shared/ui_shadcn/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui_shadcn/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui_shadcn/popover";
import { toast } from "sonner";
import {
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useUpdateProjectMutation
} from "@/modules/projects/api/projectsApi";
import {ProjectBriefDto} from "@/types/dto/projects/ProjectBriefDto";

type ProjectFormValues = z.infer<ProjectBriefDto>;

const defaultValues: ProjectFormValues = {
    name: "",
    key: "",
    description: "",
    status: "planned",
    priority: "medium",
};

export default function ProjectFormPage() {
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const navigate = useNavigate();

    const { data: project, isLoading } = useGetProjectByIdQuery(id!, {
        skip: !isEdit,
    });

    const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    useEffect(() => {
        if (project) {
            form.reset({
                name: project.name,
                key: project.key,
                description: project.description || "",
                status: project.status,
                startDate: project.startDate ? new Date(project.startDate) : undefined,
                dueDate: project.dueDate ? new Date(project.dueDate) : undefined,
                priority: project.priority || "medium",
            });
        }
    }, [project, form]);

    const onSubmit = async (values: ProjectFormValues) => {
        try {
            if (isEdit && id) {
                await updateProject({ id, ...values }).unwrap();
                toast.success("Проект обновлён");
            } else {
                const result = await createProject(values).unwrap();
                toast.success("Проект создан");
                // Переходим сразу в созданный проект
                navigate(`/projects/${result}`);
                return;
            }
            navigate("/projects");
        } catch (err: any) {
            toast.error(err?.data?.message || "Не удалось сохранить проект");
        }
    };

    if (isEdit && isLoading) {
        return <div className="p-8 text-center">Загрузка проекта...</div>;
    }

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isEdit ? "Редактирование проекта" : "Новый проект"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEdit ? project?.name : "Заполните информацию о проекте"}
                    </p>
                </div>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название проекта *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Например: Разработка мобильного приложения" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ключ проекта *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="APP, CRM, WEB2025" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Короткий уникальный идентификатор (используется в задачах: APP-123)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Цели проекта, важные детали, контекст..."
                                        className="min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Статус</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите статус" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="planned">Планируется</SelectItem>
                                            <SelectItem value="active">В работе</SelectItem>
                                            <SelectItem value="on_hold">На паузе</SelectItem>
                                            <SelectItem value="archived">Завершён / Архив</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Приоритет</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Приоритет" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Низкий</SelectItem>
                                            <SelectItem value="medium">Средний</SelectItem>
                                            <SelectItem value="high">Высокий</SelectItem>
                                            <SelectItem value="critical">Критический</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Срок завершения</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: ru })
                                                    ) : (
                                                        <span>Выберите дату</span>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Блок действий */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t">
                        <Button type="submit" disabled={isCreating || isUpdating}>
                            <Save className="mr-2 h-4 w-4" />
                            {isEdit ? "Сохранить изменения" : "Создать проект"}
                        </Button>

                        {isEdit && (
                            <>
                                <Button variant="outline" asChild>
                                    <a href={`/projects/${id}/board`}>
                                        <FolderKanban className="mr-2 h-4 w-4" />
                                        Доска задач
                                    </a>
                                </Button>

                                <Button variant="outline" asChild>
                                    <a href={`/projects/${id}/table`}>
                                        <ListTodo className="mr-2 h-4 w-4" />
                                        Таблица задач
                                    </a>
                                </Button>

                                <Button variant="outline" asChild>
                                    <a href={`/projects/${id}/comments`}>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Комментарии проекта
                                    </a>
                                </Button>

                                <Button variant="outline" asChild>
                                    <a href={`/projects/${id}/history`}>
                                        <History className="mr-2 h-4 w-4" />
                                        История изменений
                                    </a>
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Form>

            {/* Блок "История изменений" (заглушка) */}
            {isEdit && (
                <div className="mt-12 border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Последние изменения проекта
                    </h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Название изменено</span>
                            <span>14 марта 2026, 11:42</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Статус → В работе</span>
                            <span>13 марта 2026, 09:15</span>
                        </div>
                        {/* Здесь можно будет подгружать реальную историю через отдельный endpoint */}
                    </div>
                </div>
            )}
        </div>
    );
}
