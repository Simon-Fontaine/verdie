import { container } from '@sapphire/framework';
import { Time } from '@sapphire/duration';

interface GuildMemberFetchQueueShardEntry {
	pending: string[];
	fetching: number;
}

const maximumQueriesPerMinute = 90;

export class GuildMemberFetchQueue {
	public interval = setInterval(() => this.fetch(), Time.Minute).unref();
	private readonly shards = new Map<number, GuildMemberFetchQueueShardEntry>();

	public destroy() {
		clearInterval(this.interval);
	}

	public add(shardId: number, guildId: string) {
		const entry = this.shards.get(shardId);
		if (entry) {
			entry.pending.push(guildId);
		} else {
			this.shards.set(shardId, {
				fetching: 0,
				pending: [guildId]
			});
		}
	}

	public remove(shardId: number, guildId: string) {
		const entry = this.shards.get(shardId);
		if (!entry) return;

		const index = entry.pending.indexOf(guildId);
		if (index === -1) return;

		entry.pending.splice(index, 1);
	}

	public fetch() {
		for (const entry of this.shards.values()) this.fetchShard(entry);
	}

	private fetchShard(entry: GuildMemberFetchQueueShardEntry) {
		while (entry.fetching < maximumQueriesPerMinute && entry.pending.length > 0) {
			const guildId = entry.pending.shift()!;
			const guild = container.client.guilds.cache.get(guildId);

			if (!guild?.available) continue;

			if (guild.memberCount === guild.members.cache.size) continue;

			guild.members
				.fetch()
				.catch((error) => container.logger.error(error))
				.finally(() => --entry.fetching);

			entry.fetching++;
		}
	}
}
