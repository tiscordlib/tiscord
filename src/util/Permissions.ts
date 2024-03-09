import { PermissionFlagsBits } from "discord-api-types/v10";
import { BitField } from "../";

/**
 * Valid values for permissions
 * @typedef {Permission}
 */
export type PermissionType = keyof typeof PermissionFlagsBits;

/**
 * A permission object, used for permission bitfield.
 * @class
 * @extends {BitField}
 * @param {(number|bigint|number[]|bigint[])} bits - Bitfield bits
 */
export class Permissions extends BitField {
	constructor(bits: number | bigint | number[] | bigint[]) {
		super(PermissionFlagsBits, bits);
	}

	/**
	 * Checks whether the bitfield has a specific permission.
	 * @param {PermissionsBitField} value - Value to check
	 * @returns {boolean}
	 */
	has(value: keyof typeof PermissionFlagsBits): boolean {
		if (super.has("Administrator")) return true;
		return super.has(value);
	}
}
