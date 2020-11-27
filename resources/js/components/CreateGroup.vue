<template>
	<div class="input-group">
		<input
			type="text"
			class="form-control"
			placeholder="Название новой группы"
			v-model="groupName"
		/>
		<div class="input-group-append">
			<button
				class="btn btn-outline-primary"
				type="button"
				@click="create"
			>
				Добавить
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CreateGroup',
	data() {
		return {
			groupName: '',
		};
	},
	methods: {
		create() {
			if (!this.groupName.length) return;

			this.$store.dispatch('createGroup', this.groupName);

			this.groupName = '';
		},
	},
};
</script>
