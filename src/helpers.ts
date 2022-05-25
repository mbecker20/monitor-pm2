import { exec } from "child_process";
import { promisify } from "util";
import { CommandLogError } from "./types";

const pExec = promisify(exec);

export function prettyStringify(json: any) {
	return JSON.stringify(json, undefined, 2);
}

export async function execute(
	command: string,
	commandForLog?: string
): Promise<CommandLogError> {
	try {
		return {
			command: commandForLog || command,
			log: await pExec(command),
			isError: false,
		};
	} catch (err) {
		return {
			command: commandForLog || command,
			log: { stderr: prettyStringify(err) },
			isError: true,
		};
	}
}