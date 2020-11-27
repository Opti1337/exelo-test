import Vue from 'vue';
import VueRouter from 'vue-router';
import GroupView from '../views/Group.vue';
import GroupsView from '../views/Groups.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'groups',
			component: GroupsView,
		},
		{
			path: '/:group_id',
			name: 'group',
			component: GroupView,
			beforeEnter: (to, from, next) => {
				let groupId = Number.parseInt(to.params.group_id);

				if (isNaN(groupId)) {
					next('/');
				} else {
					to.params.group_id = groupId;
					next();
				}
			},
		},
	],
});

export default router;
