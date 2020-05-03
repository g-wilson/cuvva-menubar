import crypto from 'crypto';

const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateTokens(event, args) {
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
