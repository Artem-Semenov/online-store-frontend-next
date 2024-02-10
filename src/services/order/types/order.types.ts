import { ICartItem } from "@/types/cart.interface";
import { IUser } from "@/types/user.interface";

export const orderBaseUrl = "orders";

export enum EnumOrderItemStatus {
	PENDING = "PENDING",
	PAYED = "PAYED",
	SHIPPED = "SHIPPED",
	DELIVERED = "DELIVERED",
}

export interface TCreateOrderData {
	id: number;
	createdAt: string;
	items: ICartItem[];
	status: EnumOrderItemStatus;
	user: IUser;
}
