/**
 * Message options type
 * @property {string} name - Roles name
 * @property {string} permissions - Roles permissions
 * @property {number} color - Roles color in RGB color value
 * @property {boolean} hoist -    Whether the role should be displayed separately in the sidebar
 * @property {string} unicodeEmoji - The role's unicode emoji as a standard emoji
 * @property {boolean} mentionable - Whether the role should be mentionable
 */
export interface RoleOptions {
	name: string;
	permissions: string;
	color: number;
	hoist: boolean;
	unicodeEmoji: string;
	mentionable: boolean;
}
