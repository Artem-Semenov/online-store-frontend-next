import type { IMenuItem } from "@/components/dashboardLayout/sidebar/menu.interface";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { KanbanIcon, LayoutDashboard, Timer } from "lucide-react";

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: "Dashboard",
	},
	{
		icon: KanbanIcon,
		link: DASHBOARD_PAGES.PRODUCTS,
		name: "Prodcuts",
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.ORDERS,
		name: "Orders",
	},
];
