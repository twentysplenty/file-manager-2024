import {createBrotliCompress} from 'zlib';
import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from 'fs';
import {resolve} from 'path';

export const compress = async (fileToCompress, destination, currentDir) => {
	const filePath = resolve(currentDir, fileToCompress);
	const fileCompPath = resolve(currentDir, destination);
	const rs = createReadStream(filePath);
	const ws = createWriteStream(fileCompPath);
	try {
		await pipeline(
			rs,
			createBrotliCompress(),
			ws
		);
	} catch (err) {
		console.log('Operation failed');
	}
};
