import { instance } from "@/api/api.interceptor";
import {
	TstatisticsReturn,
	statisticsBaseUrl,
} from "@/services/statistics/types/statistics.types";

export const StatisticsBaseUrlService = {
	async getProfile() {
		return instance<TstatisticsReturn>({
			url: statisticsBaseUrl,
			method: "GET",
		});
	},
};
