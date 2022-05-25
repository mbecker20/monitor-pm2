import { trimProcess } from "./pm2"

export type CommandLogError = {
	command: string;
	log: Log;
	isError: boolean;
};

export type Log = {
	stdout?: string;
	stderr?: string;
};

export type Pm2Process = ReturnType<typeof trimProcess>;