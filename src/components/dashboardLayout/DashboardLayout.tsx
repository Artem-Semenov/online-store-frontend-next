import { TLanguages } from "@/app/i18n/types";
import { Header } from "@/components/dashboardLayout/header/Header";
import { Sidebar } from "@/components/dashboardLayout/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({
	children,
	lang,
}: PropsWithChildren<{ lang: TLanguages }>) {
	return (
		<div className="grid min-h-screen xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]">
			<Sidebar lang={lang} />
			<main className="p-9 overflow-x-hidden max-h-screen relative">
				<Header />
				{children}
			</main>
		</div>
	);
}
