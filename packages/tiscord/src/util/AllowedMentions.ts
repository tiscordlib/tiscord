export class AllowedMentions {
    parse: ('roles' | 'users' | 'everyone')[];
    replied_uses: boolean;
    roles: string[];
    users: string[];
    constructor(mentions: RawMentions) {
        if (mentions.parse) this.parse = mentions.parse;
        if (mentions.roles) this.roles = mentions.roles;
        if (mentions.users) this.users = mentions.users;
        if (mentions.repliedUser) this.replied_uses = mentions.repliedUser;
    }
}
export interface RawMentions {
    parse?: ('users' | 'roles' | 'everyone')[];
    roles?: string[];
    users?: string[];
    repliedUser?: boolean;
}
