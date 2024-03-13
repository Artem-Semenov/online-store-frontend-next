import { UserRole } from "@/types/user.interface";
import { LucideIcon } from "lucide-react";

export interface IMenuItem {
	link: string;
	name: string;
	icon: LucideIcon;
	roles: (UserRole | null)[];
}
