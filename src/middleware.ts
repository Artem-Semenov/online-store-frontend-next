import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware, i18nMiddleware } from "../middleware";

export async function middleware(request: NextRequest) {
	// console.log("middleware run", request.nextUrl.pathname);

	const authResponse = await authMiddleware(request);
	if (authResponse) return authResponse;

	const i18nResponse = i18nMiddleware(request);
	if (i18nResponse) return i18nResponse;

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
