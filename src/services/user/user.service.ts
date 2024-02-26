import { axiosWithAuth } from "@/api/api.interceptor";
import { userBaseUrl } from "@/services/user/types/user.types";
import { IUser } from "@/types/user.interface";
import { IUserUpdateData } from "@/services/user/types/user.types";

export const UserService = {
	async getProfile() {
		return axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "GET",
		});
	},

	async updateProfile(data: IUserUpdateData) {
		return axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "PUT",
			data,
		});
	},

	async toggleFavorite(productId: string | number) {
		return axiosWithAuth<IUser>({
			url: `${userBaseUrl}/profile/favorites/${productId}`,
			method: "PATCH",
		});
	},
};
