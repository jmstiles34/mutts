export type Dog = {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
};

export type Location = {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
};

export type Coordinates = {
	lat: number;
	lon: number;
};

export type SearchResponse = {
	resultIds: string[];
	total: number;
	next: string;
	prev: string;
};

export type MatchResponse = {
	match: string;
};

export interface FormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement;
	email: HTMLInputElement;
}
