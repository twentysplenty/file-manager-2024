import { rm } from 'fs/promises';
import { resolve } from 'path';

export const remove = async (pathToFile, currentDir) => {
	const resolvedPathToFile = resolve(currentDir, pathToFile);
	try {
		await rm(resolvedPathToFile);
	} catch (err) {
		console.log('Operation failed');
	}
};
