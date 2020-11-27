import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		groups: [],
	},
	getters: {
		groupById: state => groupId => {
			return state.groups.find(group => group.id === groupId);
		},
	},
	mutations: {
		setGroups(state, groups) {
			state.groups = groups;
		},
		addGroup(state, group) {
			state.groups.push(group);
		},
		setGroup(state, group) {
			state.groups = [
				...state.groups.filter(g => g.id !== group.id),
				group,
			];
		},
		addTask(state, { groupId, task }) {
			let group = state.groups.find(group => group.id === groupId);

			group.tasks.push(task);
		},
		deleteTask(state, { groupId, taskId }) {
			let group = state.groups.find(group => group.id === groupId);

			group.tasks = group.tasks.filter(task => task.id !== taskId);
		},
		setTaskStatus(state, { groupId, taskId, completed }) {
			let group = state.groups.find(group => group.id === groupId);
			let task = group.tasks.find(task => task.id == taskId);

			task.completed = completed;
		},
	},
	actions: {
		async createGroup({ commit }, title) {
			let group = (
				await axios.post('/api/groups', {
					title,
				})
			).data;

			commit('addGroup', group);
		},
		async fetchGroups({ commit }) {
			axios.get('/api/groups').then(response => {
				commit('setGroups', response.data);
			});
		},
		async fetchGroup({ commit }, groupId) {
			return axios.get(`/api/groups/${groupId}`).then(response => {
				commit('setGroup', response.data);
			});
		},
		async createTask({ commit }, { groupId, value }) {
			let task = (
				await axios.post(`/api/groups/${groupId}/tasks`, {
					value,
				})
			).data;

			commit('addTask', { groupId, task });
		},
		async deleteTask({ commit }, { groupId, taskId }) {
			await axios.delete(`/api/groups/${groupId}/tasks/${taskId}`);

			commit('deleteTask', { groupId, taskId });
		},
		async updateTaskStatus({ commit }, { groupId, taskId, completed }) {
			await axios.put(`/api/groups/${groupId}/tasks/${taskId}`, {
				completed,
			});

			commit('setTaskStatus', { groupId, taskId, completed });
		},
	},
	modules: {},
});

export default store;
