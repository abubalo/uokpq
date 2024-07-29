import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = ["/login", "/signup", "/papers", "/"].some(
    (publicPath) => path.startsWith(publicPath)
  );

  const token = request.cookies.get("Bearer")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/papers",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
