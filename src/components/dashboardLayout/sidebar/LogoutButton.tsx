"use client";

import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => push("/"),
	});
	return (
		<div className="absolute top-1 right-1">
			<button
				className="opacity-20 hover:opacity-100 transition-opacity duration-300"
				onClick={() => mutate()}
			>
				<LogOut size={20} />
			</button>
		</div>
	);
}
