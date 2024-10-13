import { container, LogLevel } from '@sapphire/framework';
import { ServerOptions } from '@sapphire/plugin-api';
import { InternationalizationContext, InternationalizationOptions } from '@sapphire/plugin-i18next';
import { ScheduledTaskHandlerOptions } from '@sapphire/plugin-scheduled-tasks';
import { envParseBoolean, envParseInteger, envParseNumber, envParseString } from '@skyra/env-utilities';
import { ActivityType, ClientOptions, GatewayIntentBits, Options, Partials, PresenceData, PresenceUpdateStatus } from 'discord.js';
import { setup } from '@skyra/env-utilities';

setup({ path: '.env' });

function parseApi(): ServerOptions | undefined {
	if (envParseBoolean('API_ENABLED', false)) return undefined;

	return {
		prefix: envParseString('API_PREFIX', '/'),
		origin: envParseString('API_ORIGIN', 'http://localhost:3000'),
		listenOptions: { port: envParseInteger('API_PORT', 3000) },
		automaticallyConnect: false
	};
}

async function fetchLanguage(context: InternationalizationContext) {
	if (context.interactionGuildLocale || context.interactionLocale) {
		return context.interactionGuildLocale || context.interactionLocale || null;
	}

	if (!context.guild) {
		return 'en-US';
	}

	const guildSettings = await container.prisma.guild.findUnique({
		where: {
			id: context.guild.id
		}
	});

	return guildSettings ? guildSettings.language : 'en-US';
}

function parseInternationalizationOptions(): InternationalizationOptions {
	return {
		fetchLanguage
	};
}

function parseBullOptions(): ScheduledTaskHandlerOptions['bull'] {
	return {
		connection: {
			port: envParseNumber('REDIS_PORT', 6379),
			password: process.env.REDIS_PASSWORD,
			host: envParseString('REDIS_HOST', 'localhost'),
			db: envParseInteger('REDIS_DB', 0),
			username: process.env.REDIS_USERNAME
		}
	};
}

function parseScheduledTasksOptions(): ScheduledTaskHandlerOptions {
	return {
		bull: parseBullOptions()
	};
}

function parsePresenceOptions(): PresenceData {
	return {
		status: PresenceUpdateStatus.Online,
		activities: [
			{
				name: 'your commands 👀',
				type: ActivityType.Watching
			}
		]
	};
}

export const VERDIE_OPTIONS: ClientOptions = {
	allowedMentions: { users: [], roles: [] },
	api: parseApi(),
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel],
	logger: {
		level: envParseString('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug
	},
	shards: 'auto',
	makeCache: Options.cacheEverything(),
	i18n: parseInternationalizationOptions(),
	tasks: parseScheduledTasksOptions(),
	presence: parsePresenceOptions()
};
