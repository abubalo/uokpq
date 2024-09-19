import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/login",
    "/register",
    "/paper",
    "/reset-password",
    "/",
  ];
  const isPublicPath = publicPaths.some((publicPath) =>
    publicPath === "/" ? path === publicPath : path.startsWith(publicPath)
  );

  const token = request.cookies.get("Bearer")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
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
    "/register",
    "/reset-password",
    "/paper/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
