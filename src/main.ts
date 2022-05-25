import Fastify from "fastify";
import { connectToPm2 } from "./pm2";
import routes from "./routes";

const app = Fastify({ logger: true });

app.register(routes);

const start = async () => {
	try {
		await connectToPm2();
		await app.listen(4000, "0.0.0.0");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

start();