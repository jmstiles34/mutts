export type Paging = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	pages: number[];
};

const setPages = (currentPage:number, totalPages:number) => {
	const pageNumbers: number[] = [];
	const maxVisiblePages = 5;

	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return pageNumbers;
};

class PagingState {
	currentPage: number = $state(1);
	totalPages: number = $state(0);
	totalItems: number = $state(0);
	pages: number[] = $derived(setPages(this.currentPage, this.totalPages));

	resetPaging = () => {
		this.currentPage = 1;
		this.totalPages = 0;
		this.totalItems = 0;
		this.pages = [];
	};
}

export const paging = new PagingState();
