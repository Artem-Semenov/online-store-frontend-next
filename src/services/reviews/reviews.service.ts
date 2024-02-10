import { instance } from "@/api/api.interceptor";
import { IReview } from "@/types/review.interface";
import {
	reviewsBaseUrl,
	type TCreateReviewData,
} from "@/services/reviews/types/reviews.types";

export const ReviewsService = {
	async getAll() {
		return instance<IReview[]>({
			url: reviewsBaseUrl,
			method: "GET",
		});
	},

	async create(productId: string | number, data: TCreateReviewData) {
		return instance<IReview>({
			url: `${reviewsBaseUrl}/${productId}`,
			method: "POST",
			data,
		});
	},
};
