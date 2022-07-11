export class Tisflake {
    static getTimestamp(snowflake: bigint | string) {
        if (typeof snowflake === 'string') snowflake = BigInt(snowflake);
        return Number((snowflake >> 22n) + 1420070400000n);
    }
    static getDate(snowflake: bigint | string) {
        return new Date(this.getTimestamp(snowflake));
    }
    static getWorkerId(snowflake: bigint | string) {
        if (typeof snowflake === 'string') snowflake = BigInt(snowflake)
        return (snowflake >> 17n) & 0b11111n
    }
    static getProcessId(snowflake: bigint | string) {
        if (typeof snowflake === 'string') snowflake = BigInt(snowflake)
        return (snowflake >> 12n) & 0b11111n
    }
    static getIncrement(snowflake: bigint | string) {
        if (typeof snowflake === 'string') snowflake = BigInt(snowflake)
        return snowflake & 0b111111111111n
    }
}