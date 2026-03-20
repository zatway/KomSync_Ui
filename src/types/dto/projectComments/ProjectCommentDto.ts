export interface ProjectCommentDto {
    id: string;
    projectId: string;
    content: string;              // текст комментария (может быть markdown)
    author: {
        id: string;
        name: string;
        avatarUrl?: string;
        email?: string;
    };
    createdAt: string;            // ISO
    updatedAt?: string;           // ISO, если редактировался
    parentId?: string;            // для ответов (null = корневой комментарий)
    replies?: ProjectCommentDto[];   // вложенные ответы (опционально загружаются отдельно)
    likesCount?: number;
    isEdited?: boolean;
    canEdit?: boolean;            // права текущего пользователя
    canDelete?: boolean;
}
