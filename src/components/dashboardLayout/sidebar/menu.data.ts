import type { IMenuItem } from "@/components/dashboardLayout/sidebar/menu.interface";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { UserRole } from "@/types/user.interface";
import { KanbanIcon, LayoutDashboard, Settings, Timer } from "lucide-react";

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: "Dashboard",
		roles: [UserRole.admin, UserRole.manager],
	},
	{
		icon: KanbanIcon,
		link: DASHBOARD_PAGES.PRODUCTS,
		name: "Prodcuts",
		roles: [UserRole.admin, UserRole.manager],
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.ORDERS,
		name: "Orders",
		roles: [UserRole.admin],
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: "Settings",
		roles: [UserRole.admin],
	},
];
