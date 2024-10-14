import { argv } from "node:process";
import * as readline from "node:readline";
import * as os from "node:os";
import * as path from "node:path";
import { changeDirectory } from "./src/changeDirectory.js";
import { listDirectory } from "./src/list.js";
import { addFile } from "./src/addFile.js"
import { renameFile } from "./src/rename.js";
import { copy } from "./src/copy.js"
import { remove } from "./src/delete.js";
import { calculateHash } from "./src/calcHash.js";
import { compress } from "./src/compress.js";
import { decompress } from "./src/decompress.js";
import { cat } from "./src/read.js"


let currentDir = os.homedir();

const main = async () => {

	const usernameArgv = argv[2] || "--username=Anonymous";
	const username = usernameArgv.replace("--username=", "");

	if (usernameArgv.startsWith("--username=") && username !== "") {
		console.log(`Welcome to the File Manager, ${username}`)
	} else console.log(`Welcome to the File Manager, Anonymous`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log(`You are currently in ${currentDir}`)

	rl.prompt();
	rl.on("line", async (line) => {
		const cmdFromUser = line.trim().split(" ");
		switch (cmdFromUser[0]) {
			case ".exit":
				rl.close();
				return
			case "os":
				switch (cmdFromUser[1]) {
					case "--EOL":
						console.log(os.EOL);
						break;
					case "--cpus":
						console.log(os.cpus());
						break;
					case "--homedir":
						console.log(os.homedir());
						break;
					case "--username":
						console.log(os.userInfo().username);
						break;
					case "--architecture":
						console.log(os.arch());
						break;
					default:
						console.log("Invalid input");
						break;
				}
				break;
			case "up":
				currentDir = path.resolve(currentDir, "../");
				break;
			case "cd":
				const newDir = cmdFromUser[1] || "";
				try {
					currentDir = await changeDirectory(currentDir, newDir);
				} catch (error) { console.log(error.message) }
				break;
			case "ls":
				await listDirectory(currentDir);
				break;
			case "add":
				const newFile = cmdFromUser[1] || "";
				try {
					await addFile(currentDir, newFile);
				} catch (error) { console.log(error) }
				break;
			case "rn":
				await renameFile(cmdFromUser[1], cmdFromUser[2], currentDir);
				break;
			case "cp":
				await copy(cmdFromUser[1], cmdFromUser[2], currentDir);
				break;
			case 'mv':
				await copy(cmdFromUser[1], cmdFromUser[2], currentDir);
				await remove(cmdFromUser[1], currentDir);
				break;
			case 'rm':
				await remove(cmdFromUser[1], currentDir);
				break;
			case 'hash':
				await calculateHash(cmdFromUser[1], currentDir);
				break;
			case 'compress':
				await compress(cmdFromUser[1], cmdFromUser[2], currentDir);
				break;
			case 'decompress':
				await decompress(cmdFromUser[1], cmdFromUser[2], currentDir);
				break;
			case 'cat':
				await cat(cmdFromUser[1], currentDir);
				break;
			default:
				console.log("Invalid input");
				break;
		}
		console.log(`You are currently in ${currentDir}`)
	});
	rl.on("close", () => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`)
	});
}

await main();


