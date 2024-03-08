export function validateLength(
	value: string,
	minLength: number,
	maxLength: number,
	errorMessage: string,
) {
	if (value.length > maxLength || value.length < minLength) {
		throw new Error(errorMessage);
	}
}

export function validTitle(title: string) {
	validateLength(title, 1, 256, "Title must be between 1 and 256 characters");
}

export function validDescription(description: string) {
	validateLength(
		description,
		1,
		4096,
		"Description must be between 1 and 4096 characters",
	);
}

export function validFieldCount(fields: any[]) {
	if (fields.length > 25) {
		throw new Error("Embeds can only have 25 fields");
	}
}

export function validFieldName(name: string) {
	validateLength(
		name,
		1,
		256,
		"Field name must be between 1 and 256 characters",
	);
}

export function validFieldValue(value: string) {
	validateLength(
		value,
		1,
		1024,
		"Field value must be between 1 and 1024 characters",
	);
}

export function validFooter(text: string) {
	validateLength(
		text,
		1,
		2048,
		"Footer text must be between 1 and 2048 characters",
	);
}

export function validAuthorName(name: string) {
	validateLength(
		name,
		1,
		256,
		"Author name must be between 1 and 256 characters",
	);
}
