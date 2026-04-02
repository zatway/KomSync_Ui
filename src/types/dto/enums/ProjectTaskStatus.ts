/** Совпадает с серверным ProjectTaskStatus (JSON: строковые имена enum). */
export enum ProjectTaskStatus {
    Todo = "Todo",
    InProgress = "InProgress",
    Review = "Review",
    Done = "Done",
    Blocked = "Blocked",
}
