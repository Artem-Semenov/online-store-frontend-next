"use server";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { revalidatePath } from "next/cache";
const clearCachesByServerAction = async (path: string) => {
	try {
		if (path) {
			revalidatePath(path);
		} else {
			revalidatePath("/");
			revalidatePath("/[lang]");
		}
	} catch (error) {
		console.error("clearCachesByServerAction=> ", error);
	}
};

export const revalidateDashboard = async () => {
	revalidatePath(DASHBOARD_PAGES.HOME);
};

export default clearCachesByServerAction;
