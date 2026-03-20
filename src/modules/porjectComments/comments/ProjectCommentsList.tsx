import {ProjectCommentDto} from "@/types/dto/projectComments/ProjectCommentDto";
import {MessageSquare} from "lucide-react";
import {ProjectCommentItem} from "@/modules/porjectComments";

interface Props {
    comments: ProjectCommentDto[];
    isLoading: boolean;
    projectId: string;
}

export function ProjectCommentsList({ comments, isLoading, projectId }: Props) {
    if (isLoading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-3">
                            <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!comments.length) {
        return (
            <div className="text-center py-16 text-muted-foreground">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">Пока нет комментариев</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {comments.map((comment) => (
                <ProjectCommentItem
                    key={comment.id}
                    comment={comment}
                    projectId={projectId}
                    level={0}
                />
            ))}
        </div>
    );
}
