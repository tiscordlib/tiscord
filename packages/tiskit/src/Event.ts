import { TiskitClient } from './TiskitClient';

export interface EventConstructor {
    // eslint-disable-next-line lines-around-comment
    /**
     * A unique key to represent this event.
     * @type {string}
     */
    eventName: string;

    /**
     * The code to run when that event is emitted.
     * @type {function}
     */
    eventCallback: (client: TiskitClient, ...args: any[]) => any;

    /**
     * The name of the event that'll be emitted by the base library.
     * @type {string}
     */
    emittedName: string;
}

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

    constructor({ eventName, eventCallback, emittedName }: EventConstructor) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
        this.emittedName = emittedName;
    }
}
