import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { deletePm2, getPm2Log, listPm2Processes, restartPm2, startPm2, stopPm2 } from "./pm2";

const routes = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.get("/processes", async (_, res) => {
		const processes = await listPm2Processes();
		res.send(processes);
	});

	app.get('/logs/:name', async (req, res) => {
		const { name } = req.params as { name: string };
		const { lines } = req.query as { lines: number };
		if (name) {
			const logs = await getPm2Log(name, lines);
			res.send(logs);
		} else {
			res.status(400);
			res.send("specify a name");
		}
	});

	app.get("/start/:name", async (req, res) => {
		const { name } = req.params as { name: string }
		if (name) {
			const log = await startPm2(name);
			res.send(log);
		} else {
			res.status(400);
			res.send("specify a name");
		}
	});

	app.get("/stop/:name", async (req, res) => {
		const { name } = req.params as { name: string }
		if (name) {
			const log = await stopPm2(name);
			res.send(log);
		} else {
			res.status(400);
			res.send("specify a name")
		}
	});

	app.get("/restart/:name", async (req, res) => {
		const { name } = req.params as { name: string }
		if (name) {
			const log = await restartPm2(name);
			res.send(log);
		} else {
			res.status(400);
			res.send("specify a name");
		}
	})

	app.get("/delete/:name", async (req, res) => {
		const { name } = req.params as { name: string };
		if (name) {
			const log = await deletePm2(name);
			res.send(log);
		} else {
			res.status(400);
			res.send("specify a name");
		}
	});

	done();
});

export default routes;