import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { BACKEND_URL } from "./constants/env";

export default async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.includes(".")) {
    const hash = request.nextUrl.pathname.replace("/", "");
    const originalUrl: string = await fetch(`${BACKEND_URL}${hash}`)
      .then((res) => res.json())
      .then((res: { url: string }) => res.url);

    const response = NextResponse.redirect(originalUrl, {
      status: 302,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
