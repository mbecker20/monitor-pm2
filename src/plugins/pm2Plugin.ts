import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import pm2 from "pm2";

declare module "fastify" {
	interface FastifyInstance {
		pm2Enabled: {
			get: () => boolean;
			set: (enabled: boolean) => void;
		};
	}
}

const pm2Plugin = fp((app: FastifyInstance, _: {}, done: () => void) => {
	let pm2Enabled = true;
	app.decorate("pm2Enabled", {
		get: () => pm2Enabled,
		set: (enabled: boolean) => {
			pm2Enabled = enabled;
		}
	});
	pm2.connect((err) => {
		if (err) {
			app.pm2Enabled.set(false);
		}
	});
	done();
});

export default pm2Plugin;