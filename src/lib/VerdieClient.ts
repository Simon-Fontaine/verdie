import { SapphireClient } from '@sapphire/framework';
import { VERDIE_OPTIONS } from '../config';
import { Enumerable } from '@sapphire/decorators';
import { GuildMemberFetchQueue } from '#lib/discord';

export class VerdieClient extends SapphireClient {
	@Enumerable(false)
	public override readonly guildMemberFetchQueue = new GuildMemberFetchQueue();

	public constructor() {
		super(VERDIE_OPTIONS);
	}

	public override async login(token?: string): Promise<string> {
		return await super.login(token);
	}

	public override async destroy(): Promise<void> {
		this.guildMemberFetchQueue.destroy();
		return super.destroy();
	}

	public override async computeGuilds() {
		if (this.shard) {
			const guilds = await this.shard.broadcastEval((c) => c.guilds.cache.filter((g) => g.available).size);

			return guilds.reduce((acc, g) => acc + g, 0);
		}

		return this.guilds.cache.size;
	}

	public override async computeUsers() {
		if (this.shard) {
			const users = await this.shard.broadcastEval((c) =>
				c.guilds.cache.filter((g) => g.available).reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0)
			);

			return users.reduce((acc, m) => acc + m, 0);
		}

		return this.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0);
	}
}
