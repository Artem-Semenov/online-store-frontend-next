import { useProfile } from "@/hooks/useProfile";
import { IUserUpdateData } from "@/services/user/types/user.types";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

export const useInitialData = (reset: UseFormReset<IUserUpdateData>) => {
	const { data, isSuccess, isLoading } = useProfile();

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data?.email,
				name: data?.name,
				avatarPath: data?.avatarPath,
				phone: data?.phone,
			});
		}
	}, [isSuccess]);

	return { isLoading };
};
