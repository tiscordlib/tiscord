import { expect, test } from "vitest";
import { Cache } from "../../src/cache/Cache";
import { MessageCache } from "../../src/cache/MessageCache";
test("cache", () => {
	const cache = new Cache();
	cache.set(1n, { id: 1n, test: "string" });
	expect(cache.get(1n, 1n)).toEqual({ id: 1n, test: "string" });
});
test("message cache", () => {
	const cache = new MessageCache(5);
	for (let i = 0; i < 10; i++) {
		// @ts-expect-error
		cache.set(BigInt(1n), { id: BigInt(i), test: "string" });
	}
	expect(cache.caches.get(1n)?.size).toBe(5);
});
