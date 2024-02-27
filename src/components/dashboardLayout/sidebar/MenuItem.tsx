import { IMenuItem } from "@/components/dashboardLayout/sidebar/menu.interface";
import Link from "next/link";

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div>
			<Link
				href={item.link}
				className="flex gap-2.5 items-center py-1.5 mt-2 px-3 transition-colors hover:bg-white/20 rounded-lg"
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	);
}
