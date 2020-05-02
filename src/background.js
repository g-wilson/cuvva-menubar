import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { template as menuTemplate } from './backend/menu.js';
import { menubar } from 'menubar';
import path from 'path';
import { register as registerEvents } from './backend/events.js';
import { Menu, app, protocol } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

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
	Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

	console.log('Menubar-KSUID ready 🤙');

	mb.window.webContents.openDevTools();
});

function getWindowURL() {
	if (process.env.WEBPACK_DEV_SERVER_URL)
		return process.env.WEBPACK_DEV_SERVER_URL;

	createProtocol('app');

	// Load the index.html when not in development
	return 'app://./index.html';
}
