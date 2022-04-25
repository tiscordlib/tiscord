import { Event } from './Event';
import { LocalizableObject } from './typings';

export class Plugin {
    name: LocalizableObject;
    description: LocalizableObject;
    emoji: string;
    eventStore = new Map<string, Event>();

    constructor({
        name,
        description,
        emoji
    }: {
        name: LocalizableObject;
        description: LocalizableObject;
        emoji: string;
    }) {
        this.name = name;
        this.description = description;
        this.emoji = emoji;
    }

    get defaultName() {
        return this.name['en-US'];
    }

    get defaultDescription() {
        return this.name['en-US'];
    }
}
