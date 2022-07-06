import del = require('del');
import { existsSync, mkdir, mkdirSync, rmdirSync } from 'fs'

async function emptyPath(path: string): Promise<void> {

	if (await existsSync(path)) {

		await del(path);

		await mkdirSync(path);

	}

}

export { emptyPath	 }