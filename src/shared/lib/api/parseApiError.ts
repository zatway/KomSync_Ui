/** Разбор ProblemDetails / ValidationProblemDetails с API ASP.NET Core */

type ProblemBody = {
    title?: string
    detail?: string
    errors?: Record<string, string[]>
}

export function getApiErrorMessage(error: unknown): string {
    if (typeof error !== 'object' || error === null) return 'Произошла ошибка'

    const err = error as { status?: number; data?: unknown }
    const data = err.data

    if (typeof data === 'string' && data.trim()) return data

    if (typeof data === 'object' && data !== null) {
        const d = data as ProblemBody
        if (typeof d.detail === 'string' && d.detail.trim()) return d.detail
        if (d.errors && typeof d.errors === 'object') {
            const firstKey = Object.keys(d.errors)[0]
            const msgs = firstKey ? d.errors[firstKey] : undefined
            if (msgs?.length) return msgs[0]!
        }
        if (typeof d.title === 'string' && d.title && !d.title.toLowerCase().includes('validation')) {
            return d.title
        }
    }

    if (err.status === 401) return 'Нужно войти в систему'
    if (err.status === 403) return 'Недостаточно прав'
    if (err.status === 404) return 'Не найдено'
    if (err.status === 409) return 'Конфликт данных'

    return 'Произошла ошибка'
}

export function getApiValidationErrors(error: unknown): Record<string, string> | null {
    if (typeof error !== 'object' || error === null) return null
    const data = (error as { data?: unknown }).data
    if (typeof data !== 'object' || data === null) return null
    const errors = (data as ProblemBody).errors
    if (!errors) return null
    const flat: Record<string, string> = {}
    for (const [key, msgs] of Object.entries(errors)) {
        if (msgs?.[0]) flat[key] = msgs[0]!
    }
    return Object.keys(flat).length ? flat : null
}
