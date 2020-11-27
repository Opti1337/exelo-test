<template>
    <div class="task-list">
        <ul class="list-group">
				<li
					class="list-group-item"
					v-for="task in tasks"
					:key="task.id"
				>
					<div
						class="d-flex justify-content-between align-items-center"
					>
						<div class="custom-control custom-checkbox">
							<input
								type="checkbox"
								class="custom-control-input"
								:id="`task_checkbox_${task.id}`"
								:checked="task.completed"
								@change="setStatus($event, task.id)"
							/>
							<label
								class="custom-control-label"
								:for="`task_checkbox_${task.id}`"
								v-text="task.value"
							></label>
						</div>
						<div
							class="btn btn-outline-danger btn-sm"
							@click="$emit('delete-task', task.id)"
						>
							X
						</div>
					</div>
				</li>
			</ul>
    </div>
</template>

<script>
    export default {
        name: 'TaskList',
        props: {
            tasks: {
                type: Array,
                required: true,
            }
		},
		methods: {
			setStatus(e, taskId) {
				this.$emit('set-status', {taskId, completed: e.target.checked})
			}
		}
    }
</script>