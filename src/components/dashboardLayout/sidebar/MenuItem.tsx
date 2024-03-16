import { useTranslation } from "@/app/i18n";
import { TLanguages } from "@/app/i18n/types";
import { IMenuItem } from "@/components/dashboardLayout/sidebar/menu.interface";
import Link from "next/link";

export async function MenuItem({
	item,
	lang,
}: {
	item: IMenuItem;
	lang: TLanguages;
}) {
	const { t } = await useTranslation(lang, "sidebar");
	return (
		<div>
			<Link
				href={item.link}
				className="flex gap-2.5 items-center py-1.5 mt-2 px-3 transition-colors hover:bg-white/20 rounded-lg"
			>
				<item.icon />
				{/* @ts-ignore TODO - ???*/}
				<span>{t(`${item.name}`)}</span>
			</Link>
		</div>
	);
}
