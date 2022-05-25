import pm2, { ProcessDescription } from "pm2";
import { execute } from "./helpers";
import { Pm2Process } from "./types";

export function connectToPm2(): Promise<void> {
	return new Promise((res, rej) => {
		pm2.connect((err) => {
			if (err) {
				rej(err)
			} else {
				res();
			}
		})
	})
}

export function trimProcess(p: ProcessDescription) {
	return {
		pid: p.pid,
		name: p.name,
		status: p.pm2_env?.status,
		cpu: p.monit?.cpu,
		memory: p.monit?.memory,
		uptime: p.pm2_env?.pm_uptime ? Date.now() - p.pm2_env?.pm_uptime : 0,
		createdAt: (p.pm2_env as any)?.created_at,
		restarts: p.pm2_env?.restart_time
	}
}

export function listPm2Processes(): Promise<Pm2Process[]> {
	return new Promise((res, rej) => {
		pm2.list((err, list) => {
			if (err) {
				rej(err);
			} else {
				res(list.map(p => trimProcess(p)));
				// res(list);
			}
		})
	})
}

export async function getPm2Log(name: string, lines = 50) {
	const res = await execute(`pm2 logs ${name} --nostream --lines ${lines}`);
	return res.log;
}

export async function startPm2(name: string) {
	const res = await execute(`pm2 start ${name}`);
	return res.log;
}

export async function stopPm2(name: string) {
	const res = await execute(`pm2 stop ${name}`);
	return res.log;
}

export async function restartPm2(name: string) {
	const res = await execute(`pm2 restart ${name}`);
	return res.log;
}

export async function deletePm2(name: string) {
	const res = await execute(`pm2 delete ${name}`);
	return res.log;
}

