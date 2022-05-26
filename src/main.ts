import Fastify from "fastify";
import pm2Plugin from "./plugins/pm2Plugin";
import routes from "./plugins/routes";

const app = Fastify({ logger: true });

app
	.register(pm2Plugin)
	.register(routes);

const start = async () => {
	try {
		await app.listen(4000, "0.0.0.0");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

start();