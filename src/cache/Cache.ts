export class Cache {
    caches: Map<string, Map<string, any>>;
    constructor() {
        this.caches = new Map();
    }
    get(parent: string, object: string) {
        return this.caches.get(parent)?.get(object);
    }
    set(parent: string, object: any) {
        if (!this.caches.has(parent)) this.caches.set(parent, new Map());
        this.caches.get(parent).set(object.id, object);
    }
}
