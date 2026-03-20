import {ProjectForm, ProjectCreateHeader} from "@/modules/projects";

export default function ProjectCreatePage() {
    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectCreateHeader/>

            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <ProjectForm
                    submitLabel="Создать проект"
                />
            </div>
        </div>
    );
}
