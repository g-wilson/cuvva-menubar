<template>
	<div id="app" :class="{ 'has-error': Boolean(error) }">

		<div class="tabs">
			<div @click="changeTab('ksuids')" :class="{ active: activeTab === 'ksuids' }"><span>KSUIDs</span></div>
			<div @click="changeTab('tokens')" :class="{ active: activeTab === 'tokens' }"><span>Tokens</span></div>
		</div>

		<form-ksuid :items="items" v-if="activeTab === 'ksuids'" />
		<form-token :items="items" v-if="activeTab === 'tokens'" />

	</div>
</template>

<script>
import { ipcRenderer } from 'electron';

import FormKsuid from './components/FormKSUID';
import FormToken from './components/FormToken';

export default {
	name: 'KsuidMenubar',
	components: {
		FormKsuid,
		FormToken,
	},
	data: () => ({
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
	methods: {
		changeTab(tab) {
			this.activeTab = tab;
		},
	},
};
</script>

<style lang="scss">
@import './scss/variables';
@import './scss/mixins';
@import './scss/global';
@import './scss/forms';

.tabs {
	background: darken($backgroundColor, 30%);
	display: flex;
	flex-direction: row;

	&> div {
		background: darken($backgroundColor, 15%);
		padding: 6px 12px;
		margin-right: 1px;
		cursor: pointer;

		&.active {
			background: $backgroundColor;
		}

		&> span {
			font-weight: bold;
			cursor: pointer;
		}
	}
}
</style>
