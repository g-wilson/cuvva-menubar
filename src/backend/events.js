import crypto from 'crypto';
import electron from 'electron';
import ksuid from '@cuvva/ksuid';

const ipc = electron.ipcMain;

const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function register() {
	ipc.on('generate-ksuids', generateKsuids);
	ipc.on('generate-tokens', generateTokens);
}

function generateKsuids(event, args) {
	const { resource, env, limit } = args;
	ksuid.environment = env;

	try {
		ksuid.generate(resource).toString();
	} catch (e) {
		event.sender.send('error', e);

		return;
	}

	const items = [];

	for (let i = 0; i < limit; i++)
		items[i] = ksuid.generate(resource).toString();

	event.sender.send('new-items', items);
}

function generateTokens(event, args) {
	const { limit, length } = args;
	const items = [];

	for (let i = 0; i < limit; i++)
		items[i] = generateToken(length);

	event.sender.send('new-items', items);
}

function generateToken(length) {
	const bytes = crypto.randomBytes(length);

	const chars = [];

	for (let i = 0; i < length; i++)
		chars[i] = CHARSET[bytes[i] % CHARSET.length];

	return chars.join('');
}
