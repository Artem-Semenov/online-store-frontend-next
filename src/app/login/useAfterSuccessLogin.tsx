"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useAfterSuccessLogin() {
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
	}, [callback]);
}
