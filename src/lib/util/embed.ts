import { Colors } from 'discord.js';
import { ClientColor } from '#utils/constants';

export function successEmbed(description: string, ephemeral = true) {
	return {
		ephemeral,
		embeds: [
			{
				color: ClientColor,
				description
			}
		]
	};
}

export function errorEmbed(description: string, ephemeral = true) {
	return {
		ephemeral,
		embeds: [
			{
				color: Colors.Red,
				description
			}
		]
	};
}
