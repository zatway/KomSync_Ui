import { generatePath, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { env } from "@/env";
import type { KnowledgeTreeNode } from "@/modules/knowledge/lib/knowledgeTree";

type Props = {
    nodes: KnowledgeTreeNode[];
    searchSuffix: string;
    currentSlug?: string;
    canEdit: boolean;
    onAddChild: (parentId: string) => void;
    depth: number;
};

export function KnowledgeTree({ nodes, searchSuffix, currentSlug, canEdit, onAddChild, depth }: Props) {
    return (
        <ul
            className={
                depth
                    ? "ml-2 border-l border-border/80 pl-2.5 space-y-0.5"
                    : "space-y-0.5"
            }
        >
            {nodes.map(({ item, children }) => (
                <li key={item.id}>
                    <div className="group flex items-start gap-0.5">
                        <ChevronRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-60" />
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                                <Link
                                    to={
                                        generatePath(env.ROUTE_KNOWLEDGE_ARTICLE, {
                                            slug: item.slug,
                                        }) + searchSuffix
                                    }
                                    className={`block flex-1 truncate rounded px-1.5 py-1 text-sm transition-colors hover:bg-accent ${
                                        currentSlug === item.slug
                                            ? "bg-accent font-medium text-foreground"
                                            : "text-foreground/90"
                                    }`}
                                >
                                    {item.title}
                                </Link>
                                {canEdit && (
                                    <button
                                        type="button"
                                        className="shrink-0 rounded p-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100"
                                        title="Дочерняя статья"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onAddChild(item.id);
                                        }}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                            {children.length > 0 && (
                                <KnowledgeTree
                                    nodes={children}
                                    searchSuffix={searchSuffix}
                                    currentSlug={currentSlug}
                                    canEdit={canEdit}
                                    onAddChild={onAddChild}
                                    depth={depth + 1}
                                />
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
