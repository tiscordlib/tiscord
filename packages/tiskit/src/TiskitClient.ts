import { Client, ClientOptions } from 'tiscord';
import { Event } from './Event';

interface TiskitClientOptions {
    // eslint-disable-next-line lines-around-comment
    /**
     * A list of Guild IDs to limit your commands to.
     * @type string[]
     */
    testGuilds?: string[];

    /**
     * Options for the Tiscord client.
     * @type ClientOptions
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
     * @param {Event} event - The event to add.
     */
    async addEvent(event: Event) {
        const parent = this.events.get(event.emittedName);

        if (parent) {
            throw new TypeError(`Event ${event.eventName} already exists`);
        }

        this.events.set(event.eventName, event);

        this.on(event.emittedName, (...args) => {
            event.eventCallback(this, ...args);
        });
    }
}
