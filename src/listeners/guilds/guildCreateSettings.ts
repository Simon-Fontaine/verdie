import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from '@sapphire/framework';
import { GatewayDispatchEvents, type GatewayGuildCreateDispatch } from 'discord.js';

@ApplyOptions<Listener.Options>({ event: GatewayDispatchEvents.GuildCreate, emitter: 'ws' })
export class UserListener extends Listener {
	public override run({ id }: GatewayGuildCreateDispatch['d']) {
		return this.container.prisma.guild.upsert({
			where: { id },
			create: { id },
			update: {}
		});
	}
}
