import '#lib/setup';

import { container } from '@sapphire/framework';
import { VerdieClient } from './lib/VerdieClient';

async function connectToDatabase() {
	container.logger.info('Connecting to the database...');
	await container.prisma.$connect();
	container.logger.info('Connected to the database.');
}

async function loginToDiscord(client: VerdieClient) {
	container.logger.info('Logging in to Discord...');
	await client.login();
	container.logger.info('Logged in to Discord.');
}

async function main() {
	const client = new VerdieClient();

	try {
		await connectToDatabase();
		await loginToDiscord(client);
	} catch (error) {
		container.logger.error('An error occurred during startup:', error);
		await cleanup(client);
		process.exit(1);
	}
}

async function cleanup(client: VerdieClient) {
	container.logger.info('Cleaning up resources...');
	await container.prisma.$disconnect();
	await client.destroy();
}

main().catch((error) => {
	container.logger.error('Unhandled error in main:', error);
	process.exit(1);
});
