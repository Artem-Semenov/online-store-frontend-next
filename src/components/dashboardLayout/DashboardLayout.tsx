import { Header } from "@/components/dashboardLayout/header/Header";
import { Sidebar } from "@/components/dashboardLayout/sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div className="grid min-h-screen xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]">
			<Sidebar />
			<main className="p-9 overflow-x-hidden max-h-screen relative">
				<Header />
				{children}
			</main>
		</div>
	);
}
