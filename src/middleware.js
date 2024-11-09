import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";


const publicRoutes = ["/login", "/"];

export async function middleware(request) {
  const requestedPath = request.nextUrl.pathname;
  const { response, user: AuthData } = await updateSession(request);
  const isAuthenticated = Boolean(AuthData?.data.user);

  
  console.log("requested path:", requestedPath);
  // console.log("auth data:", AuthData);
  // If user is not logged in AND trying to access a protected route
  // if (!isAuthenticated) {
  //   if (publicRoutes.includes(requestedPath)) {
  //     return response;
  //   }
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
