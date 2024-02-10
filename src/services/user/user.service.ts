import { instance } from "@/api/api.interceptor";
import { userBaseUrl } from "@/services/user/types/user.types";
import { IUser } from "@/types/user.interface";
import { IUserUpdateData } from "@/services/user/types/user.types";

export const UserService = {
	async getProfile() {
		return instance<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "GET",
		});
	},

	async updateProfile(data: IUserUpdateData) {
		return instance<IUser>({
			url: `${userBaseUrl}/profile`,
			method: "PUT",
			data,
		});
	},

	async toggleFavorite(productId: string | number) {
		return instance<IUser>({
			url: `${userBaseUrl}/profile/favorites/${productId}`,
			method: "PATCH",
		});
	},
};
