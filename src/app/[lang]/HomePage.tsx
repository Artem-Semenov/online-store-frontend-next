import { PropsWithLocale } from "@/app/[lang]/page";
import { useTranslation } from "@/app/i18n";
import { TLanguages } from "@/app/i18n/types";
import Heading from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home page",
	description: "",
};

export default async function HomePage({ lang }: { lang: TLanguages }) {
	const { t } = await useTranslation(lang);
	// console.log("lang", lang);

	// console.log(t);
	return (
		<div>
			<Heading>{t("helloWorld")}</Heading>
		</div>
	);
}
