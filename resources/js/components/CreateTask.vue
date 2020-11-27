<template>
	<div class="input-group">
		<input
			type="text"
			class="form-control"
			placeholder="Текст задачи"
			v-model="taskValue"
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
	props: {
		groupId: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			taskValue: '',
		};
	},
	methods: {
		create() {
			if (!this.taskValue.length) return;

			this.$store.dispatch('createTask', {
				groupId: this.groupId,
				value: this.taskValue,
			});

			this.taskValue = '';
		},
	},
};
</script>
