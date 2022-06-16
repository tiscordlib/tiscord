import { Extension } from './Extension';

/**
 * Represents an event in an extension. This should not be interfaced with directly but through the ClientEvent decorator in an extension class.
 * @class
 * @param {string} eventName - The name of the event method.
 * @param {any} eventCallback - The callback of that event method.
 * @param {string} emittedName - The name of the event that'll be emitted by the base library.
 */
export class Event {
    eventName: any;
    eventCallback: (...args: any[]) => any;
    emittedName: any;

    constructor(eventName: string, eventCallback: (...args: any[]) => any, emittedName: string) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
        this.emittedName = emittedName;
    }
}

/**
 * Mark an extension method as an event.
 * @param {string} emittedName The name of the event tha>t'll be emitted by Tiscord, defaults to method name.
 * @returns {(target: Extension, propertyKey: string, eventCallback: PropertyDescriptor) => void}
 */
export function ClientEvent(
    emittedName?: string
): (target: Extension, propertyKey: string, eventCallback: PropertyDescriptor) => void {
    return (extension: Extension, eventName: string, eventCallback: PropertyDescriptor) => {
        Object.defineProperty(extension, `__DECORATOR_DATA__ONLY_BY_CLIENT__${eventName}`, {
            enumerable: false,
            get: () => new Event(eventName, eventCallback.value, emittedName ?? eventName)
        });
    };
}
