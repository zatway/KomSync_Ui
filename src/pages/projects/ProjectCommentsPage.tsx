"use client";

import { useParams } from "react-router-dom";
import {useGetProjectCommentsQuery} from "@/modules/projects/api/projectsApi";
import {ProjectCommentForm, ProjectCommentsHeader, ProjectCommentsList} from "@/modules/projects";


export default function ProjectCommentsPage() {
    const { projectId } = useParams<{ projectId: string }>();

    const { data: comments, isLoading } = useGetProjectCommentsQuery(projectId!, {
        skip: !projectId,
    });

    return (
        <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectCommentsHeader projectId={projectId!} />

            <div className="mt-8 space-y-10">
                {/* Форма добавления нового комментария */}
                <ProjectCommentForm projectId={projectId!} />

                {/* Список комментариев */}
                <ProjectCommentsList comments={comments} isLoading={isLoading} projectId={projectId!} />
            </div>
        </div>
    );
}
