import { axiosWithAuth } from "@/api/api.interceptor";
import { userBaseUrl } from "@/services/user/types/user.types";
import { IUser } from "@/types/user.interface";
import { IUserUpdateData } from "@/services/user/types/user.types";

export const UserService = {
	async getProfile() {
		const res = await axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "GET",
		});

		return res.data;
	},

	async updateProfile(data: IUserUpdateData) {
		const res = await axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "PUT",
			data,
		});

		return res.data;
	},

	async toggleFavorite(productId: string | number) {
		const res = await axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile/favorites/${productId}`,
			method: "PATCH",
		});

		return res.data;
	},
};
