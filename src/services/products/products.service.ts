import { instance } from "@/api/api.interceptor";
import {
	productsBaseUrl,
	type TProductDto,
} from "@/services/products/types/products.types";
import { IProduct } from "@/types/product.interface";
import type { TFilter } from "@/services/products/types/products.types";

export const ProductsService = {
	async getAll(queryData = {} as TFilter) {
		return instance<IProduct[]>({
			url: productsBaseUrl,
			method: "GET",
			params: queryData,
		});
	},

	async getSimilar(id: string | number) {
		return instance<IProduct[]>({
			url: `${productsBaseUrl}/similar/${id}`,
			method: "GET",
		});
	},

	async getById(id: string | number) {
		return instance<IProduct>({
			url: `${productsBaseUrl}/${id}`,
			method: "GET",
		});
	},

	async getBySlug(slug: string) {
		return instance<IProduct>({
			url: `${productsBaseUrl}/by-slug/${slug}`,
			method: "GET",
		});
	},

	async getByCategorySlug(slug: string) {
		return instance<IProduct[]>({
			url: `${productsBaseUrl}/by-category/${slug}`,
			method: "GET",
		});
	},

	async create() {
		return instance<IProduct>({
			url: productsBaseUrl,
			method: "POST",
		});
	},

	async update(id: string | number, data: TProductDto) {
		return instance<IProduct>({
			url: `${productsBaseUrl}/${id}`,
			method: "PUT",
			data,
		});
	},

	async delete(id: string | number) {
		return instance<IProduct>({
			url: `${productsBaseUrl}/${id}`,
			method: "delete",
		});
	},
};
