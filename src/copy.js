import {resolve} from 'path';
import { createReadStream, createWriteStream } from 'fs';

export const copy = async (path_to_file, new_filename, current_dir) => {

	const pathToFile = resolve(current_dir, path_to_file);
	const newPathToFile = resolve(current_dir, new_filename);

	const rs = createReadStream(pathToFile);
	const ws = createWriteStream(newPathToFile);

	rs.pipe(ws);

};
