"use client";

import { useParams } from "next/navigation";

export const useLang = () => {
	const params = useParams<{ lang: string }>();
	return params.lang;
};
