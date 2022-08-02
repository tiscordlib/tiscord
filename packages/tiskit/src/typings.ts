// import { Channel, Member, Role, User } from 'tiscord';

// Locale Types for plugins.
export type Locales =
    | 'en-US'
    | 'en-GB'
    | 'pl'
    | 'nl'
    | 'tr'
    | 'zh-CN'
    | 'zh-TW'
    | 'da'
    | 'de'
    | 'es-ES'
    | 'fr'
    | 'hr'
    | 'it'
    | 'lt'
    | 'hu'
    | 'no'
    | 'pt-BR'
    | 'ro'
    | 'fi'
    | 'sv-SE'
    | 'vi'
    | 'ko'
    | 'ja'
    | 'cs'
    | 'ru'
    | 'uk'
    | 'el'
    | 'hi'
    | 'th'
    | 'bg';

export type LocalizableObject = {
    [Key in Locales]?: string;
};

// // Type mapping helpers.
// type OptionsMap = {
//     STRING: string;
//     3: string;
//     INTEGER: number;
//     4: number;
//     BOOLEAN: boolean;
//     5: boolean;
//     USER: User;
//     6: User;
//     CHANNEL: Channel;
//     7: Channel;
//     ROLE: Role;
//     8: Role;
//     MENTIONABLE: User | Member | Role;
//     9: User | Member | Role;
//     NUMBER: number;
//     10: number;
// };

// interface Option {
//     name: string;
//     description: string;
//     required?: boolean;
//     autocomplete?: never;
// }

// type MapTuple<T extends Option[]> = {
//     [Key in T[number]['name']]: Extract<T[number], { name: Key }>;
// };
