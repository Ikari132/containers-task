import type { TEvents, EventCallback } from "./types";

export class EventBus<T extends keyof TEvents = keyof TEvents> {
    private listeners: Map<T, EventCallback<T>[]>;

    constructor() {
        this.listeners = new Map();
    }

    on(eventType: T, callback: EventCallback<T>): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(callback);
    }

    remove(eventType: T, callback: EventCallback<T>): void {
        const eventListeners = this.listeners.get(eventType);
        if (eventListeners) {
            const index = eventListeners.indexOf(callback);
            if (index !== -1) {
                eventListeners.splice(index, 1);
            }
        }
    }

    dispatch(eventType: T, data?: TEvents[T]): void {
        const eventListeners = this.listeners.get(eventType);
        if (eventListeners) {
            eventListeners.forEach((callback) => {
                callback(data);
            });
        }
    }
}