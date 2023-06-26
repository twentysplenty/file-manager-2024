import { readdir, stat } from "node:fs/promises";
import * as path from "node:path";

export const listDirectory = async (currentDir) => {
	try {
		const files = await readdir(currentDir);
		const filesSorted = files.sort((a, b) => a.localeCompare(b));
		let directoryContents = [];
		for (const file of filesSorted) {
			if (file.startsWith(".")) continue; //skip hidden 
			const filePath = path.resolve(currentDir, file);
			const fileStat = await stat(filePath);

			let tableLine = {
				Name : file,
				Type : fileStat.isDirectory() ? "Directory" : "File"
			};
			directoryContents.push(tableLine);
		}
		console.table(directoryContents);
	} catch (err) {
		throw new Error("Operation failed");
	}

}

