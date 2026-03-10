export function formatDate(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    },
    locale: string = 'ru-RU',
): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    return new Intl.DateTimeFormat(locale, options).format(d);
}

// formatDate(new Date()) → "09 мар. 2026 г., 14:30"
// formatDate(new Date(), { dateStyle: 'medium' }) → "9 марта 2026 г."
