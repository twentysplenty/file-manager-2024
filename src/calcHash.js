import {createHash} from 'crypto';
import {Transform} from 'stream';
import {createReadStream} from 'fs';
import {resolve} from 'path';
import {stat} from 'fs/promises';

export const calculateHash = async (filename, current_dir) => {
	const file_path = resolve(current_dir, filename);
	let isFile = false;
	try {
		isFile = (await stat(file_path)).isFile();
	} catch {
		console.log('Operation failed');
	}
	if (isFile) {
		const hash = createHash('sha256');
		const readStream = createReadStream(file_path);
		const tr = new Transform({
			transform(chunk, _, cb) {
				cb(null, hash.update(chunk).digest('hex') + `\nYou are now in ${current_dir}\nPlease enter your command\n`);
			}
		});

		readStream.pipe(tr).pipe(process.stdout);
	}
}

