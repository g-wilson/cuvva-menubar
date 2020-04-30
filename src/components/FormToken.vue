<template>
	<div class="form">

		<div class="controls">
			<div class="columns">
				<div class="col">

					<div class="input">
						<label for="input-length">Length</label>
						<input id="input-length" v-model="tokenLength" />
					</div>

				</div>
				<div class="col">

					<div class="input">
						<label for="input-limit">Limit</label>
						<input id="input-limit" v-model="limit" />
					</div>

				</div>
			</div>
			<div class="columns offset">
				<div class="col">

					<div class="input">
						<label for="input-format">Format</label>
						<select id="input-format" v-model="format">
							<option disabled>Choose format</option>
							<option value="lines">Lines</option>
							<option value="semis">Lines w/ semis</option>
							<option value="commas">Lines w/ commas</option>
							<option value="jsarr">JS array</option>
							<option value="jsonarr">JSON array</option>
							<option value="jsonobj">JSON object</option>
						</select>
					</div>

				</div>
				<div class="col">

					<div class="action fill">
						<button @click="generate">Refresh</button>
					</div>

				</div>
			</div>
		</div>

		<output-area :items="items" :format="format" />

	</div>
</template>

<script>
import { ipcRenderer } from 'electron';
import OutputArea from './OutputArea';

export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
	components: {
		OutputArea,
	},
	data: () => ({
		tokenLength: '50',
		limit: '10',
		format: 'lines',
	}),
	created() {
		this.generate();
	},
	watch: {
		limit() { this.generate(); },
		length() { this.generate(); },
	},
	methods: {
		generate() {
			ipcRenderer.send('generate-tokens', {
				limit: parseInt(this.limit, 10),
				length: parseInt(this.tokenLength, 10),
			});
		},
	},
}
</script>
