export interface CommentAttachmentDto {
    id: string;
    fileName: string;
    contentType?: string | null;
    sizeBytes: number;
    downloadUrl: string;
    createdAt: string;
}

