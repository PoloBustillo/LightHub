import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("MIDDLEWARE");
    console.log(req.nextauth);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
