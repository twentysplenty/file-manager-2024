import * as path from "node:path";
import { writeFile } from "fs/promises";

const customError = new Error("Operation failed");

export const addFile = async (currentDir, newFile) => {
	return new Promise(async (resolve, reject) => {
		if (newFile === "") reject(customError);
		const newFilePath = path.resolve(currentDir, newFile);
		try {
				await writeFile(newFilePath, "", {flag: "wx"})
				resolve();
		} catch (err) { reject(customError) }

	});
}

