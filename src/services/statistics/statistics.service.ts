import { axiosWithAuth } from "@/api/api.interceptor";
import {
	TstatisticsReturn,
	statisticsBaseUrl,
} from "@/services/statistics/types/statistics.types";

export const StatisticsService = {
	async getStatistics() {
		const res = await axiosWithAuth<TstatisticsReturn>({
			url: statisticsBaseUrl,
			method: "GET",
		});
		return res.data;
	},
};
