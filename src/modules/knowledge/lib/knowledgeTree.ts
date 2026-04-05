import type { KnowledgeArticleListItem } from "@/modules/knowledge/api/knowledgeApi";

export type KnowledgeTreeNode = { item: KnowledgeArticleListItem; children: KnowledgeTreeNode[] };

export function buildKnowledgeTree(items: KnowledgeArticleListItem[]): KnowledgeTreeNode[] {
    const byParent = new Map<string | null, KnowledgeArticleListItem[]>();
    for (const a of items) {
        const pid = a.parentId ?? null;
        if (!byParent.has(pid)) byParent.set(pid, []);
        byParent.get(pid)!.push(a);
    }
    for (const arr of byParent.values()) {
        arr.sort(
            (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title, "ru"),
        );
    }
    const walk = (pid: string | null): KnowledgeTreeNode[] =>
        (byParent.get(pid) ?? []).map((item) => ({
            item,
            children: walk(item.id),
        }));
    return walk(null);
}
