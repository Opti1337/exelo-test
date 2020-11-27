<template>
	<div class="group-list">
		<div class="row">
			<div class="col-4" v-for="group in groups" :key="group.id">
				<div class="card mb-4">
					<div class="card-header">{{ group.title }}</div>
					<div class="card-body">
						<ul class="list-unstyled" v-if="group.tasks.length">
							<li
								v-for="task in group.tasks.slice(0, 3)"
								:key="task.id"
								v-text="task.value"
							></li>
						</ul>
						<p class="text-muted" v-else>Задач нет.</p>
						<router-link
							:to="`/${group.id}`"
							class="btn btn-primary"
						>
							Подробнее
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GroupList',
	props: {
		groups: {
			type: Array,
			required: true,
		},
	},
};
</script>
