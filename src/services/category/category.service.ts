import { axiosWithAuth } from "@/api/api.interceptor";
import { categoryBaseUrl } from "@/services/category/types/category.types";
import { ICategory } from "@/types/category.interface";

export const CategoryService = {
	async getAll() {
		return axiosWithAuth<ICategory[]>({
			url: categoryBaseUrl,
			method: "GET",
		});
	},

	async getById(id: string | number) {
		return axiosWithAuth<ICategory>({
			url: `${categoryBaseUrl}/${id}`,
			method: "GET",
		});
	},

	async getBySlug(slug: string) {
		return axiosWithAuth<ICategory>({
			url: `${categoryBaseUrl}/by-slug/${slug}`,
			method: "GET",
		});
	},

	async create() {
		return axiosWithAuth<ICategory>({
			url: categoryBaseUrl,
			method: "POST",
		});
	},

	async update(id: string | number, name: string) {
		return axiosWithAuth<ICategory>({
			url: `${categoryBaseUrl}/${id}`,
			method: "PUT",
			data: { name },
		});
	},

	async delete(id: string | number) {
		return axiosWithAuth<ICategory>({
			url: `${categoryBaseUrl}/${id}`,
			method: "delete",
		});
	},
};
