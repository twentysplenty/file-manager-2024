import { rename } from 'fs/promises';
import { resolve } from 'path';

export const renameFile = async (path_to_file, new_filename, current_dir) => {

	const _path = resolve(current_dir, path_to_file);
	const _new_path = resolve(current_dir, new_filename);
	try {
		await rename(_path, _new_path);
	} catch (error) {
		console.log('Operation failed');
	}
};
