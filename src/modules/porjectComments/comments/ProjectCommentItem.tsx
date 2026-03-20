"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import {Trash2, Reply, Edit} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar";
import { Button } from "@/shared/ui_shadcn/button";
import { ProjectCommentForm } from "./ProjectCommentForm";
import {ProjectCommentDto} from "@/types/dto/projectComments/ProjectCommentDto";
import {cn} from "@/shared/lib/ui_shadcn/utils";

interface Props {
    comment: ProjectCommentDto;
    projectId: string;
    level: number;
}

export function ProjectCommentItem({ comment, projectId, level }: Props) {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={cn("flex gap-4", level > 0 && "ml-10 border-l-2 border-muted pl-6")}>
            <Avatar className="h-10 w-10 mt-1">
                <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">
            {format(parseISO(comment.createdAt), "d MMM yyyy, HH:mm", { locale: ru })}
                        {comment.isEdited && <span className="ml-1 italic">(изменено)</span>}
          </span>
                </div>

                {isEditing ? (
                    <ProjectCommentForm
                        projectId={projectId}
                        parentId={comment.parentId}
                        onSuccess={() => setIsEditing(false)}
                        initialValues={comment.content}
                    />
                ) : (
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                    </p>
                )}

                <div className="flex items-center gap-4 mt-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => setIsReplying(!isReplying)}
                    >
                        <Reply className="mr-1 h-3.5 w-3.5" />
                        Ответить
                    </Button>

                    {comment.canEdit && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Edit className="mr-1 h-3.5 w-3.5" />
                            Редактировать
                        </Button>
                    )}

                    {comment.canDelete && (
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-destructive">
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Удалить
                        </Button>
                    )}
                </div>

                {isReplying && (
                    <div className="mt-4">
                        <ProjectCommentForm
                            projectId={projectId}
                            parentId={comment.id}
                            onSuccess={() => setIsReplying(false)}
                        />
                    </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-6 space-y-6">
                        {comment.replies.map((reply) => (
                            <ProjectCommentItem
                                key={reply.id}
                                comment={reply}
                                projectId={projectId}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
