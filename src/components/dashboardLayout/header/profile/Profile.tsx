"use client";
import Loader from "@/components/ui/Loader/Loader";
import { useProfile } from "@/hooks/useProfile";

export function Profile() {
	const { data, isLoading } = useProfile();

	return (
		<div className="absolute top-9 right-9">
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex items-center">
					<div className="text-right mr-3">
						<p className="font-bold -mb-1"> {data?.name}</p>
						<p className="font-bold -mb-1 opacity-40"> {data?.email}</p>
					</div>
					<div className="w-10 h-10 flex justify-center items-center text-2xl text-white bg-black/50 rounded uppercase">
						{data?.name?.charAt(0) || "A"}
					</div>
				</div>
			)}
		</div>
	);
}
