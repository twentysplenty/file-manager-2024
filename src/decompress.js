import {createBrotliDecompress} from 'zlib';
import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from 'fs';
import {resolve} from 'path';

export const decompress = async (file_to_decompress, destination, current_dir) => {
	const file_path = resolve(current_dir, file_to_decompress);
	const file_decomp_path = resolve(current_dir, destination);
	const rs = createReadStream(file_path);
	const ws = createWriteStream(file_decomp_path);
	try {
		await pipeline(
			rs,
			createBrotliDecompress(),
			ws
		);
	} catch (err) {
		console.log('Operation failed');
	}
};
