import type { PrismaClient } from '@prisma/client';
import type { ArrayString, BooleanString, IntegerString, NumberString } from '@skyra/env-utilities';
import { GuildMemberFetchQueue } from '#lib/discord';

declare module 'discord.js' {
	interface Client {
		readonly guildMemberFetchQueue: GuildMemberFetchQueue;
		computeGuilds(): Promise<number>;
		computeUsers(): Promise<number>;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		prisma: PrismaClient;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_OWNERS: ArrayString;
		CLIENT_COLOR: NumberString;

		API_ENABLED: BooleanString;
		API_ORIGIN: string;
		API_PORT: IntegerString;
		API_PREFIX: string;

		REDIS_PORT: NumberString;
		REDIS_HOST: string;
		REDIS_PASSWORD: string;
		REDIS_DB: IntegerString;
		REDIS_USERNAME: string;
	}
}
