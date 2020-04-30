'use strict'

import path from 'path';
import { app, protocol, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { menubar } from 'menubar';
import { template as menuTemplate } from './backend/menu.js';
import { register as registerEvents } from './backend/events.js';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

(() => {
	let winURL;

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		winURL = process.env.WEBPACK_DEV_SERVER_URL;
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		winURL = 'app://./index.html';
	}

	// TODO
	if (process.platform !== 'darwin')
		app.quit();

	const mb = menubar({
		index: winURL,
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
		registerEvents();

		Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

		console.log('Menubar-KSUID ready 🤙');
	});
})();

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
