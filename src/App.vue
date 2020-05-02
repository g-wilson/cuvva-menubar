<template>
	<div id="app" class="app-wrap" :class="{ 'has-error': Boolean(error) }">

		<tabs v-model="activeTab" :tabs="tabs" />

		<form-ksuid :items="items" v-if="activeTab === 'ksuids'" />
		<form-token :items="items" v-if="activeTab === 'tokens'" />

	</div>
</template>

<script>
import FormKsuid from './components/FormKSUID';
import FormToken from './components/FormToken';
import Tabs from './components/Tabs';
import { ipcRenderer } from 'electron';

export default {
	name: 'KsuidMenubar',
	components: {
		Tabs,
		FormKsuid,
		FormToken,
	},
	data: () => ({
		tabs: [
			{ handle: 'ksuids', label: 'KSUIDs' },
			{ handle: 'tokens', label: 'Tokens' },
		],
		activeTab: 'ksuids',
		items: [],
		error: null,
	}),
	created() {
		ipcRenderer.on('new-items', (event, items) => {
			this.error = null;
			this.items = items;
		});
		ipcRenderer.on('error', (event, e) => {
			this.error = e;
			this.items = [];
		});
	},
};
</script>

<style lang="scss">
@import './scss/variables';
@import './scss/mixins';
@import './scss/global';
@import './scss/forms';

.app-wrap {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;

	&.has-error {
		background: rgb(218, 57, 57);
	}
}
</style>
