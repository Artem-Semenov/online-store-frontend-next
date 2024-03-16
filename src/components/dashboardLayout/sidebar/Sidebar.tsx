import { TLanguages } from "@/app/i18n/types";
import { LogoutButton } from "@/components/dashboardLayout/sidebar/LogoutButton";
import { MenuItem } from "@/components/dashboardLayout/sidebar/MenuItem";
import { MENU } from "@/components/dashboardLayout/sidebar/menu.data";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { GanttChartSquareIcon } from "lucide-react";
import Link from "next/link";

export async function Sidebar({ lang }: { lang: TLanguages }) {
	const role = await useServerUserRole();

	return (
		<aside className="border-r border-r-black h-full bg-secondary flex flex-col justify-between">
			<div>
				<Link href={"/"} className="flex items-center gap-2.5 p-3 border-b">
					<GanttChartSquareIcon color="purple" size={38} />
					<span className="text-sm font-bold relative">To main page</span>
				</Link>
				<div className="p-3 relative">
					<LogoutButton />
					{MENU.filter(el => el.roles.includes(role)).map(el => (
						<MenuItem lang={lang} key={el.link} item={el} />
					))}
				</div>
			</div>
			<footer className="text-xs opacity-40 font-normal text-center p-3">
				2024 &copy; With love from {"\\*/*"}
				<br />
				All rights reserved.
			</footer>
		</aside>
	);
}
