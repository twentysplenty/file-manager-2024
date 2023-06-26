import {resolve} from 'path';
import {createReadStream} from 'fs';
import {stat} from 'fs/promises';

export const cat = async (path, current_dir) => {
	const _path = resolve(current_dir, path);
	let isFile = false;
	try {
		isFile = (await stat(_path)).isFile();
	} catch {
		console.log('Operation failed');
	}
	if (isFile) {
		const readStream = createReadStream(_path);
		readStream.on('data', chunk => process.stdout.write(chunk));
		readStream.on('end', () => {
			console.log(`You are now in ${current_dir}`)
		});
		readStream.on('error', (error) => 'Operation failed');
	}
}


