import * as path from "node:path";
import { stat } from "node:fs/promises";

const customError = new Error("Operation failed");

export const changeDirectory = async (currentDir, newDir) => {
	return new Promise(async (resolve, reject) => {
		if (newDir === "") reject(customError);
		const newPath = path.resolve(currentDir, newDir);
		try {
			const newPathStat = await stat(newPath);
			const pathIsOK = newPathStat.isDirectory();
			pathIsOK ? resolve(newPath) : reject(error);
		} catch (err) { reject(customError) }

	});
}

