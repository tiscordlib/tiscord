import { Event } from './ClientEvent';
import { TiskitClient } from './TiskitClient';

export interface ExtensionConstructor {
    events: Map<string, Event>;
}

export class Extension {
    client: TiskitClient;
    extension: Extension;
    events: Map<string, Event>;

    constructor(client: TiskitClient) {
        const constructor = this.constructor as unknown as ExtensionConstructor;

        this.client = client;
        this.events = constructor.events;
    }

    get name() {
        return this.constructor.name;
    }
}
