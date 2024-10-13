import { join } from 'path';
import { getRootData } from '@sapphire/pieces';
import { envParseNumber } from '@skyra/env-utilities';

export const mainFolder = getRootData().root;
export const rootFolder = join(mainFolder, '..');
export const srcFolder = join(rootFolder, 'src');

export const ZeroWidthSpace = '\u200B';
export const LongWidthSpace = '\u3000';

export const DefaultColor = 0x23fc97;
export const ClientColor = envParseNumber('CLIENT_COLOR', DefaultColor);

export const RandomLoadingMessage = ['Computing...', 'Thinking...', 'Cooking some food', 'Give me a moment', 'Loading...'];

export enum Emojis {}
