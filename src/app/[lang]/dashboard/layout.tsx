import DashboardLayout from "@/components/dashboardLayout/DashboardLayout";
import { PropsWithChildren } from "react";
export const dynamic = "force-dynamic";
export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
