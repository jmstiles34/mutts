export type Filters = {
	selectedBreeds: Set<string>;
	minAge: number;
	maxAge: number;
	ageError: string;
	sortField: string;
	sortOrder: 'asc' | 'desc';
	itemsPerPage: number;
};

class FilterState {
	selectedBreeds: Set<string> = $state(new Set());
	minAge = $state('');
	maxAge = $state('');
	ageError = $state('');
	sortField = $state('breed');
	sortOrder: 'asc' | 'desc' = $state('asc');
	itemsPerPage = $state(25);

	resetFilters = () => {
		this.selectedBreeds = new Set();
		this.minAge = '';
		this.maxAge = '';
		this.ageError = '';
		this.sortField = 'breed';
		this.sortOrder = 'asc';
    this.itemsPerPage = 25;
	};
}

export const filters = new FilterState();
