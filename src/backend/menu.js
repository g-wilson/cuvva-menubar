import { app } from 'electron';

export const template = [
	{
		label: 'KSUID Menubar',
		submenu: [
			{
				label: 'Quit',
				accelerator: 'CmdOrCtrl+Q',
				click: function() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				selector: 'undo:'
			}, {
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				selector: 'redo:'
			}, {
				type: 'separator'
			}, {
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				selector: 'copy:'
			}, {
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				selector: 'paste:'
			}, {
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				selector: 'selectAll:'
			},
		],
	},
];
