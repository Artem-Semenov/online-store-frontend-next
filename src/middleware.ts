import { cookieName, fallbackLng, languages } from "@/app/i18n/settings";
import {
	DASHBOARD_PAGES,
	DASHBOARD_ACCESS_GROUPS,
	CABINET_PAGES,
	PUBLIC_PAGES,
} from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { tokensEnum } from "@/services/auth/auth.helper";
import { UserRole } from "@/types/user.interface";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

const needToAttachSuffix = (request: NextRequest) => {
	return (
		!languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!request.nextUrl.pathname.startsWith("/_next")
	);
};

export async function middleware(request: NextRequest) {
	const { url } = request;
	console.log("request.nextUrl.pathname", request.nextUrl.pathname);
	const isLoginPage = url.includes(PUBLIC_PAGES.LOGIN);
	const isDashboardPage = url.includes(DASHBOARD_PAGES.HOME);
	const isCabinetPage = url.includes(CABINET_PAGES.HOME);
	const isPublicPage = !isCabinetPage && !isDashboardPage;

	//
	let lang;
	let langSuffix = "";
	if (request.cookies.has(cookieName))
		lang = acceptLanguage.get(request.cookies.get(cookieName)?.value);
	if (!lang) lang = acceptLanguage.get(request.headers.get("Accept-Language"));
	if (!lang) lang = fallbackLng;

	if (needToAttachSuffix(request)) {
		langSuffix = `/${lang}`;
		if (isPublicPage) {
			return NextResponse.redirect(
				new URL(`${langSuffix}${request.nextUrl.pathname}`, request.url),
			);
		}
	}
	//

	if (isPublicPage) {
		return NextResponse.next();
	}

	const role = await useServerUserRole();
	console.log("middleware role", role);
	const isUser = role === UserRole.user;

	console.log(111);

	if (role && isLoginPage) {
		if (isUser) {
			return NextResponse.redirect(
				new URL(langSuffix + CABINET_PAGES.HOME, request.url),
			);
		}
		return NextResponse.redirect(
			new URL(langSuffix + DASHBOARD_PAGES.HOME, request.url),
		);
	}

	if (isLoginPage) {
		return NextResponse.next();
	}

	if (!role) {
		return NextResponse.redirect(
			new URL(langSuffix + PUBLIC_PAGES.LOGIN, request.url),
		);
	}
	console.log(222);

	if (isDashboardPage && isUser) {
		return NextResponse.redirect(
			new URL(langSuffix + CABINET_PAGES.HOME, request.url),
		);
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
	console.log("need to attach", needToAttachSuffix(request));
	console.log(333);

	if (needToAttachSuffix(request)) {
		return NextResponse.redirect(
			new URL(`${langSuffix}${request.nextUrl.pathname}`, request.url),
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
