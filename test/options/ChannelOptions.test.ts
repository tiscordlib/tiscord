import { expect, test } from "vitest";
import { ChannelOptions } from "../../src/options/ChannelOptions";
test("channel options", () => {
	const options = new ChannelOptions({
		name: "test",
		type: 0,
		position: 1,
		topic: "test",
		nsfw: true,
		rate_limit_per_user: 1,
		bitrate: 128,
		user_limit: 1,
		parent_id: 1,
		video_quality_mode: 1,
		default_auto_archive_duration: 1,
	});
	expect(options.name).toBe("test");
	expect(options.type).toBe(0);
});
