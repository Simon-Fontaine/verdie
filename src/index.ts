// import './lib/setup';
import '#lib/setup';

import { container } from '@sapphire/framework';
import { VerdieClient } from './lib/VerdieClient';

const client = new VerdieClient();

const main = async () => {
	try {
		container.logger.info('Connecting to the database...');
		await container.prisma.$connect();
		container.logger.info('Connected to the database.');

		container.logger.info('Logging in to Discord...');
		await client.login();
		container.logger.info('Logged in to Discord.');
	} catch (error) {
		client.logger.error(error);
		await client.destroy();
		process.exit(1);
	}
};

main().catch(container.logger.error.bind(container.logger));
