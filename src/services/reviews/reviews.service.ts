import { axiosWithAuth } from "@/api/api.interceptor";
import { IReview } from "@/types/review.interface";
import {
	reviewsBaseUrl,
	type TCreateReviewData,
} from "@/services/reviews/types/reviews.types";

export const ReviewsService = {
	async getAll() {
		return axiosWithAuth<IReview[]>({
			url: reviewsBaseUrl,
			method: "GET",
		});
	},

	async create(productId: string | number, data: TCreateReviewData) {
		return axiosWithAuth<IReview>({
			url: `${reviewsBaseUrl}/${productId}`,
			method: "POST",
			data,
		});
	},
};
