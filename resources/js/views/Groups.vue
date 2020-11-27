<template>
	<div class="groups-view py-5">
		<h1>Exelo</h1>
		<create-group />
		<hr />
		<groups-toolbar class="mb-3" v-model="toolbar" />
		<group-list
			:groups="filteredAndSortedGroups"
			v-if="filteredAndSortedGroups.length"
		/>
		<p class="text-muted" v-else>Групп нет.</p>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import CreateGroup from '../components/CreateGroup.vue';
import GroupsToolbar from '../components/GroupsToolbar.vue';
import GroupList from '../components/GroupList.vue';

export default {
	name: 'GroupsView',
	components: {
		CreateGroup,
		GroupsToolbar,
		GroupList,
	},
	data() {
		return {
			toolbar: {
				filter: '',
				sortDirection: 0,
			},
		};
	},
	computed: {
		...mapState(['groups']),
		filteredAndSortedGroups() {
			let groups = this.groups.filter(group => {
				return new RegExp(this.toolbar.filter).test(group.title);
			});

			groups.sort((a, b) => {
				if (a.created_at > b.created_at) {
					return 1 * this.toolbar.sortDirection;
				}

				if (a.created_at < b.created_at) {
					return -1 * this.toolbar.sortDirection;
				}

				return 0;
			});

			return groups;
		},
	},
	created() {
		this.$store.dispatch('fetchGroups');
	},
};
</script>
