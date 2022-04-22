import { TiskitClient } from './TiskitClient';

/**
 * Represents an event in the bot. Using this over `EventEmitter#on` means that your event will be reloadable and removable, it also helps in identifiying events.
 * @class
 * @param {string} eventName - The name of the event method.
 * @param {function} eventCallback - The callback of that event method.
 * @param {string} emittedName - The name of the event that'll be emitted by the base library.
 */
export class Event {
    eventName: string;
    eventCallback: (client: TiskitClient, ...args: any[]) => any;
    emittedName: string;

    constructor(eventName: string, eventCallback: (client: TiskitClient, ...args: any[]) => any, emittedName: string) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
        this.emittedName = emittedName;
    }
}
