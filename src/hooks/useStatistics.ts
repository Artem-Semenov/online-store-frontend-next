"use client";
import { StatisticsService } from "@/services/statistics/statistics.service";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["statistics"],
		queryFn: () => StatisticsService.getStatistics(),
	});

	return { data, isLoading };
};
