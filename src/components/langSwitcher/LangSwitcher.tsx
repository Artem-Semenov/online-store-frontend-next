"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { TLanguages } from "@/app/i18n/types";
import { langCookieName, languages } from "@/app/i18n/settings";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LangSwitcher() {
	const pathName = usePathname();
	const { push } = useRouter();

	const redirectedPathName = (locale: TLanguages) => {
		if (!pathName) return "/";
		const segments = pathName.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	const onLangSwitch = (locale: TLanguages) => {
		console.log("onLangSwitch");

		const path = redirectedPathName(locale);
		Cookies.set(langCookieName, locale, {
			expires: 1000,
		});
		push(path);
	};

	return (
		<div>
			<p>Locale switcher:</p>
			<ul>
				{languages.map((locale: TLanguages) => {
					return (
						<li key={locale}>
							<button onClick={e => onLangSwitch(locale)}>{locale}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
