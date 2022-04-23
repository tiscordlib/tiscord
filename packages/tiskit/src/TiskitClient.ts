import { Client, ClientOptions } from 'tiscord';
import { Event, EventConstructor } from './Event';

interface TiskitClientOptions {
    // eslint-disable-next-line lines-around-comment
    /**
     * A list of Guild IDs to limit your commands to.
     * @type {string[]}
     */
    testGuilds?: string[];

    /**
     * Options for the Tiscord client.
     * @type {ClientOptions}
     */
    tiscordOptions: ClientOptions;
}

/**
 * The main client for any tiskit bot.
 * @param {TiskitClientOptions} options - Options for the tiskit client.
 */
export class TiskitClient extends Client {
    events = new Map<string, Event>();

    constructor(options: TiskitClientOptions) {
        super(options.tiscordOptions);
    }

    /**
     * Adds an event to the client.
     * @param {EventConstructor} event - The event to add.
     */
    addEvent(event: EventConstructor) {
        const parent = this.events.has(event.emittedName);

        if (parent) {
            throw new TypeError(`Event ${event.eventName} already exists`);
        }

        this.events.set(event.eventName, new Event(event));

        this.on(event.emittedName, (...args) => {
            event.eventCallback(this, ...args);
        });
    }

    /**
     * Adds multiple events to the client.
     * @param {EventConstructor[]} events - The events to add.
     */
    addEvents(...events: EventConstructor[]) {
        for (const event of events) {
            this.addEvent(event);
        }
    }
}
