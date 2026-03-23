"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Send} from "lucide-react";
import {Button} from "@/shared/ui_shadcn/button";
import {Textarea} from "@/shared/ui_shadcn/textarea";
import {Form, FormControl, FormField, FormItem} from "@/shared/ui_shadcn/form";
import {toast} from "sonner";
import {useAddProjectCommentMutation} from "@/modules/projects/api/projectsApi";

const commentSchema = z.object({
    content: z.string().min(1, "Комментарий не может быть пустым").max(2000),
});

type FormValues = z.infer<typeof commentSchema>;

interface Props {
    projectId: string;
    parentId?: string;      // если это ответ на комментарий
    onSuccess?: () => void; // закрыть форму ответа и т.д.
    initialValues?: string;
}

export function ProjectCommentForm({projectId, parentId, onSuccess, initialValues}: Props) {
    const [createComment, {isLoading}] = useAddProjectCommentMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {content: ""},
    });

    const onSubmit = async (values: FormValues) => {
        try {

            await createComment({
                projectId: projectId,
                data: {
                    content: values.content,
                    parentId,
                    projectId: projectId
                }
            }).unwrap();

            form.reset();
            toast.success(parentId ? "Ответ добавлен" : "Комментарий добавлен");
            onSuccess?.();
        } catch (err) {
            toast.error("Не удалось добавить комментарий");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="content"
                    defaultValue={initialValues}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder={parentId ? "Напишите ответ..." : "Напишите комментарий к проекту..."}
                                    className="min-h-[100px] resize-y text-base"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading || !form.formState.isValid}>
                        <Send className="mr-2 h-4 w-4"/>
                        {isLoading ? "Отправка..." : parentId ? "Ответить" : "Отправить"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
