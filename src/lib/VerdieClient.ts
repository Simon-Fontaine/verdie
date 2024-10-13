import { SapphireClient } from '@sapphire/framework';
import { VERDIE_OPTIONS } from '../config';

export class VerdieClient extends SapphireClient {
	public constructor() {
		super(VERDIE_OPTIONS);
	}

	public override async login(token?: string): Promise<string> {
		return await super.login(token);
	}

	public override async destroy(): Promise<void> {
		return super.destroy();
	}
}
