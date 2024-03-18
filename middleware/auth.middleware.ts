import {
	DASHBOARD_PAGES,
	DASHBOARD_ACCESS_GROUPS,
	CABINET_PAGES,
	PUBLIC_PAGES,
} from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { UserRole } from "@/types/user.interface";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
	const { url } = request;
	// console.log("url", url);
	const isLoginPage = url.includes(PUBLIC_PAGES.LOGIN);
	const isDashboardPage = url.includes(DASHBOARD_PAGES.HOME);
	const isCabinetPage = url.includes(CABINET_PAGES.HOME);
	const isPublicPage = !isCabinetPage && !isDashboardPage && !isLoginPage;

	if (isPublicPage) {
		return null;
	}

	const role = await useServerUserRole();
	// console.log("middleware role", role);
	const isUser = role === UserRole.user;

	if (role && isLoginPage) {
		if (isUser) {
			return NextResponse.redirect(new URL(CABINET_PAGES.HOME, request.url));
		}
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
	}

	if (isLoginPage) {
		return null;
	}

	if (!role) {
		return NextResponse.redirect(new URL(PUBLIC_PAGES.LOGIN, request.url));
	}

	if (isDashboardPage && isUser) {
		return NextResponse.redirect(new URL(CABINET_PAGES.HOME, request.url));
	}

	if (
		url.includes(DASHBOARD_PAGES.ORDERS) &&
		!DASHBOARD_ACCESS_GROUPS.ORDERS.includes(role)
	) {
		return NextResponse.redirect(new URL(PUBLIC_PAGES[404], request.url));
	}

	if (
		url.includes(DASHBOARD_PAGES.SETTINGS) &&
		!DASHBOARD_ACCESS_GROUPS.SETTINGS.includes(role)
	) {
		return NextResponse.redirect(new URL(PUBLIC_PAGES[404], request.url));
	}
	// console.log(123);

	return null;
}
