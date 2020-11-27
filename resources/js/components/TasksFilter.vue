<template>
	<div class="tasks-filter">
		<ul class="nav nav-pills">
			<li class="nav-item" v-for="filter in filters" :key="filter.key">
				<a
					class="nav-link"
                    :class="{active: value === filter.key}"
					href
					@click.prevent="onFilter(filter.key)"
					v-text="filter.title"
				></a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'TasksFilter',
	props: {
		value: {
			type: String,
			default: 'all',
		},
	},
	data() {
		return {
			filters: [
				{
					title: 'Все',
					key: 'all',
				},
				{
					title: 'Завершенные',
					key: 'completed',
				},
				{
					title: 'Незавершенные',
					key: 'unfinished',
				},
			],
		};
	},
	methods: {
		onFilter(key) {
			this.$emit('input', key);
		},
	},
};
</script>
