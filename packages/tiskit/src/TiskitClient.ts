import { Client, ClientOptions } from 'tiscord';
import { Event } from './ClientEvent';
import { Extension } from './Extension';

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
    events = new Map<string, Map<string, Event>>();
    extensions = new Map<string, Extension>();

    constructor(options: TiskitClientOptions) {
        super(options.tiscordOptions);
    }

    /**
     * Adds an event to the client.
     * @param {Extension} extension - The extension that this event method is on.
     * @param {Event} event - The event to add.
     */
    async addEvent(extension: Extension, event: Event) {
        event.eventCallback = event.eventCallback.bind(extension);
        const parent = this.events.get(extension.name);

        if (!parent) {
            this.events.set(extension.name, new Map<string, Event>());

            const parent = this.events.get(extension.name);
            parent.set(event.eventName, event);

            this.on(event.emittedName, (...args) => {
                event.eventCallback(...args);
            });

            return;
        }

        parent.set(event.eventName, event);

        this.on(event.emittedName, (...args) => {
            event.eventCallback(...args);
        });
    }

    /**
     * Adds an extension, usually called from the exported setup function of an extension file.
     * @param {Extension} extension The extension to add.
     * @returns void
     */
    async addExtension(extension: Extension) {
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(extension));

        for (const method of methods) {
            if (method !== 'constructor') {
                const data = extension[`__DECORATOR_DATA__ONLY_BY_CLIENT__${method}`];

                if (data instanceof Event) {
                    this.addEvent(extension, data);
                }
            }
        }

        this.extensions.set(extension.name, extension);
    }
}
