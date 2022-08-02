/**
 * A Bitfield class, helps with parsing a lot of discord data like permissions and intents
 * @class
 * @param {Object} map - Map of bitfield values
 * @param {(number|bigint|number[]|bigint[])} bits - Bitfield bits
 * @property {Object} map - Map of bitfield values
 * @property {bigint} bits - Bitfield bits
 */
export class BitField {
    map: Record<string, number | bigint>;
    bits: bigint;
    constructor(map: Record<string, number | bigint>, bits: number | bigint | number[] | bigint[]) {
        this.map = map;
        if (Array.isArray(bits)) {
            // @ts-expect-error
            bits = bits.reduce((acc, val) => acc | BigInt(val), 0n);
        }
        // @ts-expect-error
        if (bits) this.bits = BigInt(bits);
    }

    /**
     * Resolves a string to it's bit value
     * @param {string} value - Value to resolve
     * @returns {(number|bigint)}
     */
    resolve(value: string) {
        if (!this.map[value]) throw new Error(`${value} is not a valid bitfield value`);
        return BigInt(this.map[value]);
    }

    /**
     * Checks if there's a bit set
     * @param {string} value - Value to check
     * @returns {boolean}
     */
    has(value: string) {
        const bits = this.resolve(value);
        return (this.bits & bits) !== 0n;
    }

    /**
     * Checks what bits are set, and turns them into an array
     * @returns {string[]}
     */
    toArray() {
        return Object.keys(this.map).filter(key => this.has(key));
    }

    /**
     * Adds a bit to the bitfield
     * @param {(string|number|bigint)}value - Bits to add
     */
    add(value: string | number | bigint) {
        if (typeof value === 'string') value = this.resolve(value);
        this.bits |= BigInt(value);
    }
}
