import { tokensEnum } from "@/services/auth/auth.helper";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { url, cookies } = request;

	const accessToken = cookies.get(tokensEnum.accessToken)?.value;
	console.log("accessToken", accessToken);

	const isLoginPage = url.includes("/login");

	//add server request for check role

	if (accessToken && isLoginPage) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (accessToken) {
		return NextResponse.next();
	}

	if (!accessToken && !isLoginPage) {
		return NextResponse.redirect(new URL("login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login/:path"],
};
