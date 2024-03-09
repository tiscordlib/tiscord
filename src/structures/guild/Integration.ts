import type { APIGuildIntegration } from "discord-api-types/v10";
import { type Client, User } from "../../";

/**
 * Represents a guild integration.
 * @class
 * @param {Client} client - Client instance
 * @param {APIGuildIntegration} data - Integration data
 * @property {bigint} id - Integration ID
 * @property {string} name - Integration name
 * @property {string} type - Integration type
 * @property {boolean} enabled - Whether the integration is enabled
 * @property {User} account - Integration account
 * @property {boolean} [syncing] - Whether the integration is syncing
 * @property {string} [roleId] - Role ID
 * @property {string} [expireBehavior] - Integration expire behavior
 * @property {number} [expireGracePeriod] - Integration expire grace period
 * @property {boolean} [enableEmoticons] - Whether emoticons are enabled
 * @property {User} [user] - User instance
 * @property {string} [syncedAt] - When was the integration synced
 * @property {number} [subcriberCount] - Subscriber count
 * @property {boolean} revoked - Whether the integration was revoked
 * @property {APIGuildIntegration} raw - Raw integration data
 */
export class Integration {
	id: bigint;
	name: string;
	type: string;
	enabled: boolean;
	syncing: boolean;
	roleId?: bigint;
	enableEmoticons?: boolean;
	expireBehavior?: number;
	expireGracePeriod: number;
	user: User;
	subscriberCount: number;
	account: any;
	syncedAt: number;
	revoked: boolean;
	raw: APIGuildIntegration;
	constructor(client: Client, data: APIGuildIntegration) {
		this.id = BigInt(data.id);
		this.name = data.name;
		this.type = data.type;
		this.enabled = data.enabled;
		this.account = data.account;
		if (data.syncing) this.syncing = data.syncing;
		if (data.role_id) this.roleId = BigInt(data.role_id);
		if (data.enable_emoticons) this.enableEmoticons = data.enable_emoticons;
		if (data.expire_behavior) this.expireBehavior = data.expire_behavior;
		if (data.expire_grace_period)
			this.expireGracePeriod = data.expire_grace_period;
		if (data.user) this.user = new User(client, data.user);
		if (data.synced_at)
			this.syncedAt = new Date(data.synced_at).getTime() / 1000;
		if (data.subscriber_count) this.subscriberCount = data.subscriber_count;
		if (data.revoked) this.revoked = data.revoked;
		if (client.raw) this.raw = data;
		if (this.user) client.cache.users.set(this.user.id, this.user);
	}
}
