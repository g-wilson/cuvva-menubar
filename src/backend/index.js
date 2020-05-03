import electron from 'electron';

import { generateKsuids } from './ksuids.js';
import { generateTokens } from './tokens.js';

const ipc = electron.ipcMain;

export function registerEvents() {
	ipc.on('generate-ksuids', generateKsuids);
	ipc.on('generate-tokens', generateTokens);
}
