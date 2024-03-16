import { PropsWithLocale } from "@/app/[lang]/page";
import DashboardLayout from "@/components/dashboardLayout/DashboardLayout";
import { PropsWithChildren } from "react";
export const dynamic = "force-dynamic";

export default function Layout({
	children,
	params: { lang },
}: PropsWithChildren<PropsWithLocale>) {
	return <DashboardLayout lang={lang}>{children}</DashboardLayout>;
}
