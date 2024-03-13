"use client";

import { revalidateDashboard } from "@/hooks/server/revalidation";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AfterSuccessLogin() {
	const activatedParam = "activated";
	const searchParams = useSearchParams();

	const isLoginAfterActivation = Boolean(searchParams.get(activatedParam));

	const [isAfterSuccessfulLogin, setIsAfterSuccessfulLogin] =
		useState<boolean>(false);

	const callback = useCallback(() => {
		setIsAfterSuccessfulLogin(isLoginAfterActivation);

		if (isAfterSuccessfulLogin) {
			toast.success("Акаунт було успішно активовано!", { duration: 5000 });
		}
	}, [isAfterSuccessfulLogin]);

	useEffect(() => {
		callback();
	}, []);

	return <></>;
}
