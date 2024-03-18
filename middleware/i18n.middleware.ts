import { fallbackLng, langCookieName, languages } from "@/app/i18n/settings";
import { TLanguages } from "@/app/i18n/types";
import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

const noLangSuffix = (request: NextRequest) => {
	return (
		!languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!request.nextUrl.pathname.startsWith("/_next")
	);
};

export function i18nMiddleware(request: NextRequest) {
	// console.log("i18nMiddleware");

	const requestLocale = request.nextUrl.pathname.split("/")?.[1];

	let lang: TLanguages = fallbackLng;
	let langSuffix = "";

	if (request.cookies.has(langCookieName)) {
		lang = acceptLanguage.get(
			request.cookies.get(langCookieName)?.value,
		) as TLanguages;
	}

	if (!lang) {
		lang = acceptLanguage.get(
			request.headers.get("Accept-Language"),
		) as TLanguages;
	}

	if (noLangSuffix(request)) {
		langSuffix = `/${lang}`;
	}

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

	//для кейса когда мы вручную добавляем язык в урле - будет перекидывать назад на дефолтный
	if (!noLangSuffix(request) && requestLocale !== lang) {
		return NextResponse.redirect(
			new URL(
				`${request.nextUrl.pathname.slice(requestLocale.length + 1) || "/"}`,
				request.url,
			),
		);
	}

	return null;
}
