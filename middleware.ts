import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (token && (pathname === "/login" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && pathname !== "/login" && pathname !== "/signup") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        if (token) await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
