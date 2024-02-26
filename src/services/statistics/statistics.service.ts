import { axiosWithAuth } from "@/api/api.interceptor";
import {
	TstatisticsReturn,
	statisticsBaseUrl,
} from "@/services/statistics/types/statistics.types";

export const StatisticsBaseUrlService = {
	async getProfile() {
		return axiosWithAuth<TstatisticsReturn>({
			url: statisticsBaseUrl,
			method: "GET",
		});
	},
};
