import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import logger from "./app/logger";

const shouldBeAdminOnly = (pathname) => {
  return pathname.startsWith("/api/user/delete");
};
// middleware is applied to all routes, use conditionals to select
export default withAuth(
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
        const { pathname } = req.nextUrl;
        // if (
        //   !pathname.startsWith("/api/user/login") ||
        //   !pathname.startsWith("/api/user/create")
        // ) {
        //   if (pathname.startsWith("/api/user")) {
        //     logger.info("HERE USER" + pathname);
        //     console.log(token);
        //     return false;
        //   }
        // }
        if (pathname.startsWith("/secure") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
