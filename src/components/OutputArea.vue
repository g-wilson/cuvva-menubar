<template>
	<div class="output" :class="format">
		<template v-if="['jsonarr', 'jsarr'].includes(format)">
			<div class="row start"><span>[</span></div>
		</template>
		<template v-if="format === 'jsonobj'">
			<div class="row start"><span>{</span></div>
		</template>
		<div class="row" v-for="(item, i) in items" :key="item">
			<span>{{ formatItem(item, i === items.length - 1) }}</span>
		</div>
		<template v-if="['jsonarr', 'jsarr'].includes(format)">
			<div class="row end"><span>]</span></div>
		</template>
		<template v-if="format === 'jsonobj'">
			<div class="row end"><span>}</span></div>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		items: Array,
		format: String,
	},
	methods: {
		formatItem(str, isLast) {
			switch (this.format) {
				case 'semis':
					if (isLast) return str;
					return `${str};`;

				case 'commas':
					return `${str},`;

				case 'jsarr':
					if (isLast) return `'${str}'`;
					return `'${str}',`;

				case 'jsonarr':
					if (isLast) return `"${str}"`;
					return `"${str}",`;

				case 'jsonobj':
					if (isLast) return `"${str}": ""`;
					return `"${str}": "",`;

				case 'lines':
				default:
					return str;
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/mixins';

.output {
	@include selectable;
	flex: 1;
	background: white;
	color: #333;
	border-top: 1px solid #999;
	user-select: initial;
	overflow-x: hidden;
	overflow-y: scroll;

	.row {
		user-select: initial;
		font-size: 0.8rem;
		padding: 5px 10px;
		@include text-truncate;

		&:nth-child(even) {
			background: rgb(231, 233, 255);
		}
	}

	&.jsarr,
	&.jsonarr,
	&.jsonobj {
		.row:not(.start):not(.end) {
			padding-left: 18px;
		}
	}
}
</style>
