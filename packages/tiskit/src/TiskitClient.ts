import { Client, ClientOptions, CommandInteraction } from 'tiscord';
import { Event, EventConstructor } from './Event';
import { Plugin } from './Plugin';

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
    plugins = new Map<string, Plugin>();

    constructor(options: TiskitClientOptions) {
        super(options.tiscordOptions);

        this.on('interactionCreate', (interactaction: CommandInteraction) => {
            if (interactaction.isChatInputCommand()) {
                interactaction.reply({ content: 'hi' });
            }
        });
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
        // @ts-ignore fuck you
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

    insertPlugin(plugin: Plugin) {
        this.addEvents(...plugin.eventStore[0]);
        this.plugins.set(plugin.defaultName, plugin);
    }
}
