import DashboardLayout from "@/components/dashboardLayout/DashboardLayout";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
