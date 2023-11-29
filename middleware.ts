import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/orders",
    "/products",
  ];

  const token = request.cookies.get("token")?.value || "";

  // Check if the current path is protected and there is no token
  if (protectedRoutes.includes(path) && !token) {
    // Redirect to /admin if trying to access protected routes without a token
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  // Continue processing the request if authentication is successful or if it's a non-protected route
  return NextResponse.next();
}
