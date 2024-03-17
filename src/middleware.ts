import { langCookieName, fallbackLng, languages } from "@/app/i18n/settings";
import {
	DASHBOARD_PAGES,
	DASHBOARD_ACCESS_GROUPS,
	CABINET_PAGES,
	PUBLIC_PAGES,
} from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { UserRole } from "@/types/user.interface";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { TLanguages } from "@/app/i18n/types";

acceptLanguage.languages(languages);

const noLangSuffix = (request: NextRequest) => {
	return (
		!languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!request.nextUrl.pathname.startsWith("/_next")
	);
};

export async function middleware(request: NextRequest) {
	const { url } = request;

	const isLoginPage = url.includes(PUBLIC_PAGES.LOGIN);
	const isDashboardPage = url.includes(DASHBOARD_PAGES.HOME);
	const isCabinetPage = url.includes(CABINET_PAGES.HOME);
	const isPublicPage = !isCabinetPage && !isDashboardPage && !isLoginPage;

	//
	let lang: TLanguages;
	let langSuffix = "";
	if (request.cookies.has(langCookieName))
		lang = acceptLanguage.get(
			request.cookies.get(langCookieName)?.value,
		) as TLanguages;
	if (!lang!)
		lang = acceptLanguage.get(
			request.headers.get("Accept-Language"),
		) as TLanguages;
	if (!lang) lang = fallbackLng;

	if (noLangSuffix(request)) {
		langSuffix = `/${lang}`;
	}

	const next = (lang: TLanguages) => {
		const requestLocale = request.nextUrl.pathname.split("/")?.[1];
		if (noLangSuffix(request) && lang === fallbackLng) {
			return NextResponse.rewrite(
				new URL(`${langSuffix}${request.nextUrl.pathname}`, request.url),
			);
		}

		if (noLangSuffix(request) && lang !== fallbackLng) {
			return NextResponse.redirect(
				new URL(`${langSuffix}${request.nextUrl.pathname}`, request.url),
			);
		}

		if (!noLangSuffix(request) && requestLocale === fallbackLng) {
			return NextResponse.redirect(
				new URL(
					`${request.nextUrl.pathname.slice(requestLocale.length + 1) || "/"}`,
					request.url,
				),
			);
		}

		return NextResponse.next();
	};

	if (isPublicPage) {
		return next(lang);
	}

	const role = await useServerUserRole();
	console.log("middleware role", role);
	const isUser = role === UserRole.user;

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
		return next(lang);
	}

	if (!role) {
		return NextResponse.redirect(
			new URL(langSuffix + PUBLIC_PAGES.LOGIN, request.url),
		);
	}

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

	return next(lang);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
