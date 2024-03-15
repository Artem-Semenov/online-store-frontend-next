"use client";

import { revalidateDashboard } from "@/hooks/server/revalidation";
import { useEffect } from "react";

export function RevalidateDashboard() {
	useEffect(() => {
		revalidateDashboard();
	}, []);
	return <></>;
}
