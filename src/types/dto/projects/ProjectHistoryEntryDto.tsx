export interface ProjectHistoryEntryDto {
    id: string;                    // id записи изменения
    field: string;                 // какое поле изменилось ("name", "dueDate", "description" и т.д.)
    oldValue: any;                 // старое значение (string | null | number | object)
    newValue: any;                 // новое значение
    changedBy: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    changedAt: string;             // ISO строка
}
