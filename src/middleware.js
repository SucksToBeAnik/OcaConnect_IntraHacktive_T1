import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  const requestedPath = request.nextUrl.pathname;
  console.log("requested path:", requestedPath);
  const { response, user: AuthData } = await updateSession(request);
  console.log("middleware", AuthData);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
