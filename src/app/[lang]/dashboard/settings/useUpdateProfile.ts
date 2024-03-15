import { errorCatch } from "@/api/api.helper";
import { IUserUpdateData } from "@/services/user/types/user.types";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateProfile() {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ["update profile"],
		mutationFn: (data: IUserUpdateData) => UserService.updateProfile(data),
		onSuccess() {
			toast.success("Successfully updated");
			queryClient.invalidateQueries({
				queryKey: ["profile"],
			});
		},
		onError(error, variables, context) {
			toast.error(errorCatch(error));
		},
	});
	return { mutate, isPending };
}
