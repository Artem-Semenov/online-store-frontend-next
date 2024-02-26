import { axiosWithAuth } from "@/api/api.interceptor";
import {
	orderBaseUrl,
	TCreateOrderData,
} from "@/services/order/types/order.types";
import { IOrder } from "@/types/order.interface";

export const OrderService = {
	async getAll() {
		return axiosWithAuth<IOrder[]>({
			url: orderBaseUrl,
			method: "GET",
		});
	},

	async create(data: TCreateOrderData) {
		return axiosWithAuth<IOrder>({
			url: orderBaseUrl,
			method: "POST",
			data,
		});
	},
};
