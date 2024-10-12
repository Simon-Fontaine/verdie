import './lib/setup';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';

const client = new SapphireClient({
	defaultPrefix: '!',
	regexPrefix: /^(hey +)?bot[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	api: {
		listenOptions: {
			port: 3000
		}
	},
	shards: 'auto',
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
	loadMessageCommandListeners: true,
	hmr: {
		enabled: process.env.NODE_ENV === 'development'
	},
	tasks: {
		bull: {
			connection: {
				port: 6379,
				host: 'localhost'
			}
		}
	},
	i18n: {
		fetchLanguage: async (context: InternationalizationContext) => {
			if (context.interactionGuildLocale || context.interactionLocale) {
				return context.interactionGuildLocale || context.interactionLocale || null;
			}

			if (!context.guild) {
				return 'en-US';
			}

			// TODO: implement db
			// const guildSettings = await db.find({ guild_id: context.guildId });
			// return guildSettings.language;
			return 'en-US';
		}
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		await client.destroy();
		process.exit(1);
	}
};

void main();
