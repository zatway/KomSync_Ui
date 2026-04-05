import { useParams, useNavigate, Link } from "react-router-dom";
import {
    useGetTaskByIdQuery,
    useDeleteTaskMutation,
    useAddTaskCommentMutation,
    useUploadTaskCommentAttachmentsMutation,
    useUpdateTaskCommentMutation,
    useDeleteTaskCommentMutation,
} from "@/modules/tasks/api/tasksApi";
import { useGetProjectByIdQuery } from "@/modules/projects/api/projectsApi";
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Button } from "@/shared/ui_shadcn/button";
import { ArrowLeft, BookOpen, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/shared/ui_shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui_shadcn/card";
import { Textarea } from "@/shared/ui_shadcn/textarea";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { parseAccessTokenClaims } from "@/shared/lib/auth/tokenClaims";
import { authLocalService, getApiErrorMessage } from "@/shared/lib";
import { toAbsoluteApiUrl } from "@/shared/lib/absoluteApiUrl";
import { FilePickerButton } from "@/shared/ui/FilePickerButton";
import TaskHistory from "@/modules/tasks/components/TaskHistory";

export function TaskDetailView() {
    const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
    const navigate = useNavigate();
    const { data: task, isLoading } = useGetTaskByIdQuery(taskId!, { skip: !taskId });
    const { data: project } = useGetProjectByIdQuery(projectId!, { skip: !projectId });
    const [remove, { isLoading: deleting }] = useDeleteTaskMutation();
    const [addComment, { isLoading: addingComment }] = useAddTaskCommentMutation();
    const [uploadAttachments, { isLoading: uploading }] = useUploadTaskCommentAttachmentsMutation();
    const [updateComment, { isLoading: updatingComment }] = useUpdateTaskCommentMutation();
    const [deleteCommentMut, { isLoading: deletingComment }] = useDeleteTaskCommentMutation();
    const [commentText, setCommentText] = useState("");
    const [replyTo, setReplyTo] = useState<{ userId: string; authorName: string } | null>(null);
    const [mentionIds, setMentionIds] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");

    const currentUserId = useMemo(() => {
        const t = authLocalService.getToken();
        if (!t) return null;
        return parseAccessTokenClaims(t)?.userId ?? null;
    }, []);

    const handleDelete = async () => {
        if (!taskId || !projectId || !task) return;
        if (!confirm("Удалить задачу?")) return;
        try {
            await remove({ id: taskId, projectId }).unwrap();
            toast.success("Задача удалена");
            navigate(`${AppRoutes.TASKS}/${projectId}`);
        } catch (e) {
            toast.error(getApiErrorMessage(e));
        }
    };

    const handleAddComment = async () => {
        if (!taskId || !commentText.trim()) return;
        try {
            const commentId = await addComment({
                taskId,
                content: commentText.trim(),
                replyToUserId: replyTo?.userId ?? null,
                mentionsUserIds: mentionIds.length ? mentionIds : null,
            }).unwrap();

            if (files.length) {
                await uploadAttachments({ commentId, files, taskId }).unwrap();
            }
            setCommentText("");
            setReplyTo(null);
            setMentionIds([]);
            setFiles([]);
            toast.success("Комментарий добавлен");
        } catch (e) {
            toast.error(getApiErrorMessage(e));
        }
    };

    const startEdit = (id: string, content: string) => {
        setEditingId(id);
        setEditContent(content);
    };

    const saveEdit = async () => {
        if (!editingId || !editContent.trim()) return;
        try {
            await updateComment({ id: editingId, content: editContent.trim() }).unwrap();
            setEditingId(null);
            toast.success("Комментарий обновлён");
        } catch (e) {
            toast.error(getApiErrorMessage(e));
        }
    };

    const removeComment = async (id: string) => {
        if (!confirm("Удалить комментарий?")) return;
        try {
            await deleteCommentMut({ id }).unwrap();
            toast.success("Комментарий удалён");
        } catch (e) {
            toast.error(getApiErrorMessage(e));
        }
    };

    if (!projectId || !taskId) return null;
    if (isLoading || !task) {
        return (
            <div className="container mx-auto py-8 px-4">
                <p className="text-muted-foreground">{isLoading ? "Загрузка…" : "Задача не найдена"}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 sm:py-8 px-3 sm:px-4 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    className="px-2"
                    onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}`)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    К доске
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}/edit/${taskId}`)}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Изменить
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить
                </Button>
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-1">{task.key}</p>
                <h1 className="text-2xl sm:text-3xl font-bold break-words">{task.title}</h1>
                <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">{task.status.name}</Badge>
                    <Badge variant="outline">{task.priority}</Badge>
                    {task.deadline && (
                        <Badge variant="outline">
                            Срок: {format(parseISO(task.deadline), "d MMMM yyyy", { locale: ru })}
                        </Badge>
                    )}
                </div>
            </div>
            {task.description && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Описание</CardTitle>
                    </CardHeader>
                    <CardContent className="whitespace-pre-wrap break-words">{task.description}</CardContent>
                </Card>
            )}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        База знаний
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    <p className="mb-3">Статьи по этой задаче (и по проекту целиком).</p>
                    <Link
                        to={`${AppRoutes.KNOWLEDGE}?projectId=${projectId}&taskId=${taskId}`}
                        className="font-medium text-primary underline underline-offset-2 hover:no-underline"
                    >
                        Открыть статьи по задаче
                    </Link>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Комментарии</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {replyTo && (
                            <div className="text-xs text-muted-foreground">
                                Ответ пользователю: <span className="font-medium">{replyTo.authorName}</span>{" "}
                                <button type="button" className="underline ml-2" onClick={() => setReplyTo(null)}>
                                    отменить
                                </button>
                            </div>
                        )}
                        {project?.members?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {project.members.map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        className="text-xs px-2 py-1 rounded-md border hover:bg-accent"
                                        onClick={() => {
                                            if (!mentionIds.includes(m.id)) setMentionIds([...mentionIds, m.id]);
                                            setCommentText((prev) =>
                                                prev.trim().length ? `${prev} @${m.name}` : `@${m.name}`,
                                            );
                                        }}
                                    >
                                        @{m.name}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        <div className="flex flex-wrap items-center gap-2">
                            <FilePickerButton
                                multiple
                                disabled={addingComment || uploading}
                                onFiles={(picked) => setFiles((prev) => [...prev, ...picked])}
                                label="Прикрепить файлы"
                            />
                            {files.length > 0 && (
                                <span className="text-xs text-muted-foreground break-all">
                                    {files.map((f) => f.name).join(", ")}
                                </span>
                            )}
                        </div>
                        <Textarea
                            placeholder="Новый комментарий…"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows={3}
                        />
                        <Button onClick={handleAddComment} disabled={addingComment || uploading || !commentText.trim()}>
                            Отправить
                        </Button>
                    </div>
                    <ul className="space-y-3">
                        {task.comments.map((c) => (
                            <li key={c.id} className="border rounded-md p-3 text-sm">
                                <div className="font-medium flex items-center justify-between gap-2 flex-wrap">
                                    <span>{c.authorName}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="text-xs underline text-muted-foreground"
                                            onClick={() => setReplyTo({ userId: c.userId, authorName: c.authorName })}
                                        >
                                            Ответить
                                        </button>
                                        {currentUserId === c.userId && (
                                            <>
                                                {editingId === c.id ? (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="secondary"
                                                        disabled={updatingComment}
                                                        onClick={() => void saveEdit()}
                                                    >
                                                        Сохранить
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => startEdit(c.id, c.content)}
                                                    >
                                                        Правка
                                                    </Button>
                                                )}
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-destructive"
                                                    disabled={deletingComment}
                                                    onClick={() => void removeComment(c.id)}
                                                >
                                                    Удалить
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="text-muted-foreground text-xs mb-1">
                                    {format(parseISO(c.createdAt), "d MMM yyyy HH:mm", { locale: ru })}
                                </div>
                                {editingId === c.id ? (
                                    <Textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows={3}
                                        className="mt-2"
                                    />
                                ) : (
                                    <div className="whitespace-pre-wrap break-words">{c.content}</div>
                                )}
                                {c.attachments?.length ? (
                                    <div className="mt-2 flex flex-col gap-1">
                                        {c.attachments.map((a) => (
                                            <a
                                                key={a.id}
                                                className="text-xs underline break-all"
                                                href={toAbsoluteApiUrl(a.downloadUrl)}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {a.fileName} ({Math.round(a.sizeBytes / 1024)} KB)
                                            </a>
                                        ))}
                                    </div>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">История</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <TaskHistory history={task.history} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
