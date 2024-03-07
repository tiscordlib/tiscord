/**
 * Modal interaction options.
 * @param {any[]} data - Modal options data
 */
export class ModalOptions {
    map: Map<any, any>;
    constructor(data: any[]) {
        this.map = new Map();
        data.forEach(d => {
            if (d.type === 1) {
                d.components.forEach(option => this.map.set(option.custom_id, option.value));
            } else this.map.set(d.custom_id, d.value);
        });
    }

    /**
     * Get the value of a option.
     * @param {string} customId - The custom id of the option
     * @returns (any)
     */
    get(customId: string) {
        return this.map.get(customId);
    }
}
