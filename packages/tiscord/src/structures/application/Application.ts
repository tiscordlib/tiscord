import type { APIApplication } from 'discord-api-types/v10';
import { ApplicationFlags } from 'discord-api-types/v10';
import type { Client } from '../../';
import { Team, User } from '../../';

/**
 * Represents an application.
 * @class
 * @param {Client} client - Client instance
 * @param {APIApplication} data - Application data
 * @property {bigint} id - Application ID
 * @property {string} name - Application name
 * @property {string} icon - Application icon
 * @property {string} description - Application description
 * @property {string[]} rpcOrigins - RPC origins
 * @property {boolean} publicBot - Whether this application is public
 * @property {boolean} botRequireCodeGrant - Whether the bot requires code grant
 * @property {string} verifyKey - Verify key
 * @property {string} [termsOfService] - URL to the terms of service
 * @property {string} [privacyPolicy] - URL to the privacy policy
 * @property {User} [owner] - Owner of the application
 * @property {Team} [team] - Team of the application
 * @property {string} [guildId] - Guild ID
 * @property {string} [primarySkuId]- Primary SKU ID
 * @property {string} [slug] - Application slug
 * @property {string} [coverImage] - Application cover image
 * @property {ApplicationFlags} [flags] - Application flags
 * @property {APIApplication} [raw] - raw data
 */
export class Application {
    id: bigint;
    name: string;
    icon: string;
    description: string;
    rpcOrigins: string[];
    publicBot: boolean;
    botRequireCodeGrant: boolean;
    verifyKey: string;
    termsOfService?: string;
    privacyPolicy?: string;
    owner?: User;
    team?: Team;
    guildId?: bigint;
    primarySkuId?: bigint;
    slug?: string;
    coverImage?: string;
    flags?: keyof typeof ApplicationFlags;
    raw?: APIApplication;
    constructor(client: Client, data: APIApplication) {
        this.id = BigInt(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.rpcOrigins = data.rpc_origins;
        this.publicBot = data.bot_public;
        this.botRequireCodeGrant = data.bot_require_code_grant;
        this.verifyKey = data.verify_key;
        if (data.terms_of_service_url) this.termsOfService = data.terms_of_service_url;
        if (data.privacy_policy_url) this.privacyPolicy = data.privacy_policy_url;
        if (data.owner) this.owner = new User(client, data.owner);
        if (data.team) this.team = new Team(client, data.team);
        if (data.guild_id) this.guildId = BigInt(data.guild_id);
        if (data.primary_sku_id) this.primarySkuId = BigInt(data.primary_sku_id);
        if (data.slug) this.slug = data.slug;
        if (data.cover_image) this.coverImage = data.cover_image;
        // @ts-expect-error
        if (data.flags) this.flags = ApplicationFlags[data.flags];
        if (client.raw) this.raw = data;
        client.cache.users.set(this.owner.id, this.owner);
    }
}
