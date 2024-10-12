import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'A testing command.',
	preconditions: ['OwnerOnly']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		this.container.tasks.create({ name: 'testing', payload: { data: interaction.user.id } }, 10_000);

		const allUsers = await this.container.prisma.user.findMany();
		console.log(allUsers);

		return interaction.reply({ content: 'testing :)', ephemeral: true });
	}
}
