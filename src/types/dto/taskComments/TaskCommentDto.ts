import type { CommentAttachmentDto } from "../attachments/CommentAttachmentDto";

export interface TaskCommentDto {
    id: string;
    taskId: string;
    userId: string;
    authorName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    attachments?: CommentAttachmentDto[];
}
