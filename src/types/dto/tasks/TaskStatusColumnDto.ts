/** Совпадает с серверным TaskStatusColumnDto. */
export interface TaskStatusColumnDto {
    id: string;
    name: string;
    sortOrder: number;
    colorHex?: string | null;
    semanticKind: number;
    isDoneColumn: boolean;
    isBlockedColumn: boolean;
}
