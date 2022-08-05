import { AllowedMentionsTypes } from 'discord-api-types/v10';

export class AllowedMentions {
    parse?: AllowedMentionsTypes[];
    replied_user?: boolean;
    roles?: string[];
    users?: string[];
    constructor(mentions: RawMentions) {
        if (mentions.parse) this.parse = mentions.parse;
        if (mentions.roles) this.roles = mentions.roles;
        if (mentions.users) this.users = mentions.users;
        if (mentions.repliedUser) this.replied_user = mentions.repliedUser;
    }
}
export interface RawMentions {
    parse?: AllowedMentionsTypes[];
    roles?: string[];
    users?: string[];
    repliedUser?: boolean;
}
