import { Extension } from './Extenstion';

export class Event {
    eventName: string;
    eventCallback: (...args: any[]) => any;
    emittedName: string;

    constructor(eventName: string, eventCallback: (...args: any[]) => any, emittedName: string) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
        this.emittedName = emittedName;
    }
}

/**
 * Mark an extension method as an event.
 * @param emittedName The name of the event tha>t'll be emitted by Tiscord, defaults to method name.
 * @returns (target: Extension, propertyKey: string) => void.
 */
export function ClientEvent(emittedName?: string) {
    return (extension: Extension, eventName: string, eventCallback: PropertyDescriptor) => {
        Object.defineProperty(extension, `__DECORATOR_DATA__ONLY_BY_CLIENT__${eventName}`, {
            enumerable: false,
            get: () => new Event(eventName, eventCallback.value, emittedName ?? eventName)
        });
    };
}
