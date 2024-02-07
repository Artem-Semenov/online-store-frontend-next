import { ICategory } from "@/types/category.interface";

export interface IProduct {
	id: number;
	name: string;
	slug: string;
	description: string;
	price: number;
	reviews: string[];
	images: string[];
	createdAt: string;
	category: ICategory;
}

export interface IProductDetails {
	product: IProduct;
}
