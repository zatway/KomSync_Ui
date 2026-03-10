import { toast } from 'sonner';

export function errorHandler(
    error: unknown,
    context: string = 'Неизвестная ошибка',
    silent: boolean = false,
    showToast: boolean = true,
    customMessage?: string,
): void {
    let message = customMessage || 'Произошла ошибка';

    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as any).message);
    }

    const fullMessage = context ? `${context}: ${message}` : message;

    console.error('[ERROR]', fullMessage, error);

    if (showToast && !silent) {
        toast.error(fullMessage);
    }
}
