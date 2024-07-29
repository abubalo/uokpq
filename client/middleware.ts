import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = ["/login", "/signup", "/paper", "/"].some(
    (publicPath) => path.startsWith(publicPath)
  );

  const token = request.cookies.get("Bearer")?.value || "";

  console.log("Path:", path);
  console.log("Token:", token);
  console.log("isPublicPath:", isPublicPath);

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
    "/reset-password",
    "/paper/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
