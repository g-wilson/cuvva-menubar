import ksuid from '@cuvva/ksuid';

export function generateKsuids(event, args) {
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
