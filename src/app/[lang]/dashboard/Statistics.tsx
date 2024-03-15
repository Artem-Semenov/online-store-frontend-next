"use client";
import LoaderWothOpacity from "@/components/ui/Loader/LoaderWothOpacity";
import { useStatistics } from "@/hooks/useStatistics";

export function Statistics() {
	const { data, isLoading } = useStatistics();

	return isLoading ? (
		<LoaderWothOpacity />
	) : (
		<div className="grid grid-cols-4 gap-12 mt-7">
			{data?.length ? (
				data.map((el, i) => (
					<div
						key={i}
						className="border bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500"
					>
						<div className="text-xl"> {el.name}</div>
						<div className="text-3xl">{el.value}</div>
					</div>
				))
			) : (
				<div>Not found</div>
			)}
		</div>
	);
}
