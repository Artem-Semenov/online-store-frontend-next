export const productsBaseUrl = "products";

export enum EnumProductSort {
	HIHG_PRICE = "high-price",
	LOW_PRICE = "low-price",
	NEWEST = "newest",
	OLDEST = "oldest",
}

export type IPagination = {
	page?: string | number;
	perPage?: string | number;
};

export type TFilter = {
	sort?: EnumProductSort;

	searchTerm?: string;

	page?: IPagination["page"];

	perPage?: IPagination["perPage"];
};

export type TProductDto = {
	name: string;

	price: number;

	description?: string;

	images: string[];

	categoryId: number;
};
