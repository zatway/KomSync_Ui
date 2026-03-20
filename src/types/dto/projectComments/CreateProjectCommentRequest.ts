export interface CreateProjectCommentRequest {
    projectId: string;
    content: string;
    parentId?: string;            // если это ответ
}
