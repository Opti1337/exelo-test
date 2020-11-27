<template>
	<div class="group-view py-5">
		<template v-if="group">
			<h1>{{ group.title }}</h1>
			<create-task :group-id="groupId" />
			<hr />
			<template v-if="group.tasks.length">
				<tasks-filter class="mb-3" v-model="filter" />
				<task-list
					:tasks="filteredTasks"
					@delete-task="deleteTask"
					@set-status="setStatus"
				/>
			</template>
			<p class="text-muted" v-else>Задач нет.</p>
		</template>
	</div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapGetters } from 'vuex';

import CreateTask from '../components/CreateTask.vue';
import TasksFilter from '../components/TasksFilter.vue';
import TaskList from '../components/TaskList.vue';

export default {
	name: 'GroupView',
	components: {
		CreateTask,
		TasksFilter,
		TaskList,
	},
	data() {
		return {
			groupId: this.$route.params.group_id,
			filter: 'all',
		};
	},
	computed: {
		...mapGetters(['groupById']),
		group() {
			return this.groupById(this.groupId);
		},
		filteredTasks() {
			if (this.group) {
				return this.group.tasks.filter(task => {
					switch (this.filter) {
						case 'completed':
							return task.completed;
							break;

						case 'unfinished':
							return !task.completed;
							break;

						default:
							return true;
							break;
					}
				});
			}
		},
	},
	created() {
		if (!this.group) {
			this.$store.dispatch('fetchGroup', this.groupId);
		}
	},
	methods: {
		deleteTask: _.debounce(function(taskId) {
			this.$store.dispatch('deleteTask', {
				groupId: this.groupId,
				taskId,
			});
		}, 300),
		setStatus: _.debounce(function({ taskId, completed }) {
			this.$store.dispatch('updateTaskStatus', {
				groupId: this.groupId,
				taskId,
				completed,
			});
		}, 300),
	},
};
</script>
