import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui_shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar";
import { Separator } from "@/shared/ui_shadcn/separator";
import { ProjectDetailedDto } from "@/types/dto/projects/ProjectDetailedDto";

interface Props {
    project: ProjectDetailedDto;
}

export function ProjectTeam({ project }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Команда</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={project.owner.avatarUrl} alt={project.owner.name} />
                        <AvatarFallback>{project.owner.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{project.owner.name}</p>
                        <p className="text-sm text-muted-foreground">Владелец проекта</p>
                    </div>
                </div>

                {project.members?.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                            <p className="text-sm font-medium">Участники ({project.members.length})</p>
                            <div className="flex -space-x-2">
                                {project.members.slice(0, 5).map((member) => (
                                    <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                                        <AvatarFallback>{member.name?.[0]?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {project.members.length > 5 && (
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                                        +{project.members.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
