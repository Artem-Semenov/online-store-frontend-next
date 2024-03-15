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
		// now it doesnt work because we dont redirect user to the login page anymore
		// we set cookies into response after user confirms email thats why user redirects instantly to dashbaord
		//TODO - set client cookie on server on email confirmation redirect and call callback(toast) based on cookies here
		// after that - delete cookie to make sure that calback called only once.
		callback();
	}, []);

	return <></>;
}
