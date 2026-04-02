export type SignalRMessage = {
    topic: string;
    payload: unknown;
};

type Handler = (message: SignalRMessage) => void;

class SignalRHandlerRegistryService {
    private readonly handlers = new Map<string, Set<Handler>>();

    addHandler(topic: string, handler: Handler): () => void {
        const set = this.handlers.get(topic) ?? new Set<Handler>();
        set.add(handler);
        this.handlers.set(topic, set);

        return () => this.removeHandler(topic, handler);
    }

    removeHandler(topic: string, handler: Handler): void {
        const set = this.handlers.get(topic);
        if (!set) return;
        set.delete(handler);
        if (set.size === 0) this.handlers.delete(topic);
    }

    dispatch(message: SignalRMessage): void {
        const set = this.handlers.get(message.topic);
        if (!set?.size) return;
        set.forEach((handler) => handler(message));
    }

    clearHandlers(): void {
        this.handlers.clear();
    }
}

const signalRHandlerRegistry = new SignalRHandlerRegistryService();
export default signalRHandlerRegistry;

