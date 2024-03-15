import HomePage from "@/app/[lang]/HomePage";
import { TLanguages } from "@/app/i18n/types";

export type PropsWithLocale = {
	params: {
		lang: TLanguages;
	};
};

export default async function Home({ params: { lang } }: PropsWithLocale) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<HomePage lang={lang} />
		</main>
	);
}
