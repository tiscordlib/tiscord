export interface ClientOptions {
    token: string;
    intents: number;
    api?: string;
    rawDataStorage?: boolean;
    messageLifetime?: number;
    sweepInterval?: number;
}
