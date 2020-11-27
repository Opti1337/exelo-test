<template>
	<div class="groups-toolbar">
		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Фильтр по названию"
				v-model="model.filter"
				@input="onFilter"
			/>
			<div class="input-group-append">
				<button
					class="btn btn-outline-primary dropdown-toggle"
					type="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					v-text="activeSortTitle"
				></button>
				<div class="dropdown-menu">
					<a
						class="dropdown-item"
						:class="{
							active: model.sortDirection === sort.direction,
						}"
						href
						v-for="sort in sortingDropdown"
						:key="sort.direction"
						v-text="sort.title"
						@click.prevent="onSortDirection(sort.direction)"
					></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';

export default {
	name: 'GroupsToolbar',
	props: {
		sortDirection: {
			type: Number,
			default: 0,
		},
		value: {
			type: Object,
			default: () => {
				return {
					sortDirection: 0,
					filter: '',
				};
			},
		},
	},
	data() {
		return {
			sortingDropdown: [
				{
					title: 'Сначала новые',
					direction: -1,
				},
				{
					title: 'Сначала старые',
					direction: 1,
				},
			],
			model: this.value,
		};
	},
	computed: {
		activeSortTitle() {
			if (this.model.sortDirection === 0) {
				return 'Сортировка';
			} else {
				return this.sortingDropdown.find(
					sort => sort.direction === this.model.sortDirection
				).title;
			}
		},
	},
	methods: {
		onFilter: _.debounce(function({ target }) {
			this.$emit('input', this.model);
		}, 300),
		onSortDirection(direction) {
			this.model.sortDirection = direction;

			this.$emit('input', this.model);
		},
	},
};
</script>
