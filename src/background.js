import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { menubar } from 'menubar';
import path from 'path';
import { registerEvents } from './backend';
import { app, protocol } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';

const PROTOCOL = 'cuvvamenubar';

function main() {
	createProtocol(PROTOCOL);
	registerEvents();

	const mb = menubar({
		index: getWindowURL(),
		preloadWindow: true,
		browserWindow: {
			alwaysOnTop: false,
			resizable: false,
			width: 350,
			height: 360,
			webPreferences: {
				nodeIntegration: true,
			},
		},
		icon: path.join(__static, 'Template.png'),
	});

	mb.on('ready', async () => {
		if (isDevelopment)
			mb.window.webContents.openDevTools();

		console.log('Menubar-KSUID ready 🤙');
	});
}

function getWindowURL() {
	if (process.env.WEBPACK_DEV_SERVER_URL)
		return process.env.WEBPACK_DEV_SERVER_URL;

	return `${PROTOCOL}://./index.html`;
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{
		scheme: PROTOCOL,
		privileges: { secure: true, standard: true },
	},
]);

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit')
				app.quit();
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}

if (process.platform !== 'darwin')
	app.quit();

app.on('ready', main);
