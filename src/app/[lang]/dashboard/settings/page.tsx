import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Settings } from "@/app/[lang]/dashboard/settings/Settings";
import { PropsWithLocale } from "@/app/[lang]/page";

export const metadata: Metadata = {
	title: "",
	...NO_INDEX_PAGE,
};

export default function Page({ params: { lang } }: PropsWithLocale) {
	return <Settings />;
}
