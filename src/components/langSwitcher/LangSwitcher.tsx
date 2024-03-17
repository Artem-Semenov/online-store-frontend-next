"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { TLanguages } from "@/app/i18n/types";
import { fallbackLng, langCookieName, languages } from "@/app/i18n/settings";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LangSwitcher() {
	const currentPath = usePathname();
	const { push } = useRouter();

	const redirectedPathName = (locale: TLanguages) => {
		if (!currentPath) return "/";
		const langSUffix = `/${locale}`;

		const segments = currentPath.split("/");

		const currentLocale = segments[1] as TLanguages;

		//Если в текущем пути есть langSUffix
		if (languages.includes(currentLocale)) {
			//Если язык на который кликнули является дефолтным, то просто убираем langSUffix из пути
			if (locale === fallbackLng) {
				return currentPath.replace(`/${currentLocale}`, "") || "/";
			} else {
				//если это какой-то другой язык, то подменяем langSUffix на тот, на который кликнули.
				//У нас такой ситуации никогда не будет, так как языка всего 2
				segments[1] = locale;
				return segments.join("/");
			}
		} else {
			// если в текущем пути нет langSUffix, значит сейчас используется дефолтный язык.
			// Просто подставляем langSUffix в текущий путь
			return `${langSUffix}${currentPath}`;
		}
	};

	const onLangSwitch = (locale: TLanguages) => {
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
