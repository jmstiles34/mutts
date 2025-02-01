export type Paging = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	pages: number[];
};

class PagingState {
	currentPage: number = $state(1);
	totalPages: number = $state(0);
	totalItems: number = $state(0);
	pages: number[] = $state([]);

	resetPaging = () => {
		this.currentPage = 1;
		this.totalPages = 0;
		this.totalItems = 0;
		this.pages = [];
	};
}

export const paging = new PagingState();
