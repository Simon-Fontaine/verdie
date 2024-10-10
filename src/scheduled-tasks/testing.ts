import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class TestingTask extends ScheduledTask {
	public constructor(context: ScheduledTask.LoaderContext, options: ScheduledTask.Options) {
		super(context, options);
	}

	public async run(payload: { data: string }) {
		this.container.logger.info('I ran!', payload);
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		testing: { data: string };
	}
}
