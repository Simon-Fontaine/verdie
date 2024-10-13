import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import { ApplicationCommandType } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: "Gives information about Verdie's ping."
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});

		registry.registerContextMenuCommand({
			name: this.name,
			type: ApplicationCommandType.Message
		});

		registry.registerContextMenuCommand({
			name: this.name,
			type: ApplicationCommandType.User
		});
	}

	// slash command
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const msg = await interaction.reply({ content: 'Ping?', fetchReply: true });

		const diff = msg.createdTimestamp - interaction.createdTimestamp;
		const ping = Math.round(this.container.client.ws.ping);

		return interaction.editReply({ content: await resolveKey(interaction, 'ping:success', { diff, ping }) });
	}

	// context menu command
	public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
		const msg = await interaction.reply({ content: 'Ping?', fetchReply: true });

		const diff = msg.createdTimestamp - interaction.createdTimestamp;
		const ping = Math.round(this.container.client.ws.ping);

		return interaction.editReply({ content: await resolveKey(interaction, 'ping:success', { diff, ping }) });
	}
}
