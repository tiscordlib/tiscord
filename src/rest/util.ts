import { File } from "./APIRequest.js";
import fs from "node:fs";
import { join } from "node:path";

export function createDataURL(file: File) {
	return `data:${
		file.contentType ?? "application/octet-stream"
	};base64,${file.data.toString("base64")}`;
}

const pkg = JSON.parse(
	fs.readFileSync(join(__dirname, "../../package.json"), "utf8"),
);

export const { version } = pkg;
