import {ProjectForm, ProjectCreateHeader} from "@/modules/projects";
import {useCreateProjectMutation} from "@/modules/projects/api/projectsApi";
import {CreateProjectRequest} from "@/types/dto/projects/CreateProjectRequest";

export default function ProjectCreatePage() {
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const handleSubmit = async (values: CreateProjectRequest) => {
        return await createProject(values).unwrap();
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectCreateHeader/>

            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <ProjectForm
                    onSubmit={value => handleSubmit({
                        name: value.name,
                        departmentId: value.departmentId,
                        description: value.description,
                        key: value.key,
                        startDate: value.startDate?.toISOString(),
                        dueDate: value.dueDate?.toISOString(),
                        color: value.color,
                        icon: value.icon,
                        tags: value.tags
                    })}
                    isLoading={isLoading}
                    submitLabel="Создать проект"
                />
            </div>
        </div>
    );
}
