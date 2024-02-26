import { axiosWithAuth } from "@/api/api.interceptor";
import { IPaymentResponse } from "@/types/payment.interface";
import { paymentBaseUrl } from "@/services/payment/types/payment.types";

export const PaymentsService = {
	async create(amount: number) {
		return axiosWithAuth<IPaymentResponse>({
			url: paymentBaseUrl,
			method: "POST",
			data: { amount },
		});
	},
};
