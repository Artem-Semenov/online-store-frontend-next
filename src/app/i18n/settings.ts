import { TLanguages } from "@/app/i18n/types";

export const fallbackLng: TLanguages = "ua";
export const languages: TLanguages[] = [fallbackLng, "ru"];
export const defaultNS = "home";
export const langCookieName = "i18next";

export function getOptions(
	lng = fallbackLng,
	ns: string | string[] = defaultNS,
) {
	return {
		// debug: true,
		supportedLngs: languages,
		// preload: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
		// backend: {
		//   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
		// }
	};
}
