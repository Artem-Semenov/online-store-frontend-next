import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import Heading from "@/components/ui/Heading";
import { OrdersManagement } from "@/app/[lang]/dashboard/orders/OrdersManagement";
import { PropsWithLocale } from "@/app/[lang]/page";
import { useTranslation } from "@/app/i18n";

export const metadata: Metadata = {
	title: "Dasboard | orders",
	...NO_INDEX_PAGE,
};

export default async function Page({ params: { lang } }: PropsWithLocale) {
	const { t } = await useTranslation(lang, "orders");
	return (
		<div>
			<div>
				<Heading>{t("title")}</Heading>
				<OrdersManagement />
			</div>
		</div>
	);
}
