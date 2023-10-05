import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const shouldBeAdminOnly = (pathname) => {
  return pathname.startsWith("/api/user/delete");
};
// middleware is applied to all routes, use conditionals to select
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  async function middleware(req, event) {
    const { pathname } = req.nextUrl;

    // if (shouldBeAdminOnly(pathname)) {
    //   return new NextResponse(JSON.stringify({ error: "noAutorizado" }), {
    //     status: 401,
    //     statusText: "No tienes previlegios.",
    //   });
    // }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/secure") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
