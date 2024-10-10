import { ApplyOptions } from '@sapphire/decorators';
import { DurationFormatter } from '@sapphire/time-utilities';
import { Route, methods, type ApiRequest, type ApiResponse } from '@sapphire/plugin-api';

@ApplyOptions<Route.Options>({ route: `status` })
export class UserRoute extends Route {
	public override [methods.GET](_request: ApiRequest, response: ApiResponse) {
		const uptime = process.uptime() * 1000;
		const uptimeString = new DurationFormatter().format(uptime);
		const ping = Math.round(this.container.client.ws.ping);

		response.json({ heartbeat: ping, uptime: uptimeString });
	}
}
