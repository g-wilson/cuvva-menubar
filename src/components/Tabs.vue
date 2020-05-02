<template>
	<div class="tabs">
		<div
			v-for="tab in tabs"
			:key="tab.handle"
			@click="changeTab(tab.handle)"
			:class="{ active: value === tab.handle }"
		>
			<span>{{ tab.label }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tabs: {
			type: Array,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
	methods: {
		changeTab(tabName) {
			this.$emit('input', tabName);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/mixins';

.tabs {
	display: flex;
	flex-direction: row;
	@include no-select;
	background: darken($backgroundColor, 30%);

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
