import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Settings } from "@/app/dashboard/settings/Settings";
import Heading from "@/components/ui/Heading";

export const metadata: Metadata = {
	title: "",
	...NO_INDEX_PAGE,
};

export default function Page() {
	return <Settings />;
}
