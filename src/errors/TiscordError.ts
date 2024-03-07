export enum ErrorCode {
    Invalid_Token,
    Invalid_Intents,
    Client_Not_Ready,
    Client_Member_Not_Cached,
    Guild_Not_Found
}

const ErrorMessage = {
    [ErrorCode.Invalid_Token]: () => 'Invalid token provided.',
    [ErrorCode.Invalid_Intents]: () => 'Invalid intents provided.',
    [ErrorCode.Client_Not_Ready]: () => 'Client is not ready.',
    [ErrorCode.Client_Member_Not_Cached]: () => 'Client member is not cached.',
    [ErrorCode.Guild_Not_Found]: () => 'Guild not found. Please check if the guild is cached.'
} as const;

export class TiscordError extends Error {
    public readonly errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, message?: string) {
        super(message || ErrorMessage[errorCode]());
        Object.setPrototypeOf(this, TiscordError.prototype);
    }
}
