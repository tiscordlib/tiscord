import { TiskitClient } from './TiskitClient';

/**
 * Represents an extension or category in Tiskit.
 * This class does nothing on it's own than act as a blueprint for your own extensions and as a typedef for typescript.
 * @class
 * @param {TiskitClient} client - The client.
 */
export class Extension {
    client: TiskitClient;
    extension: Extension;

    constructor(client: TiskitClient) {
        this.client = client;
    }

    get events() {
        return this.client.events.get(this.name);
    }

    get name() {
        return this.constructor.name;
    }
}
