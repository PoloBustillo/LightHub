import prisma from "@/lib/prisma";

import * as Sentry from "@sentry/nextjs";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  let email = "";

  if (session === null)
    return new Response(
      JSON.stringify({
        errorMsg: "no autorizado",
      }),
      {
        status: 401,
        statusText: "no tienes privilegios para obtener perfil.",
      }
    );

  email = session.user.email;
  Sentry.setContext("user", {
    name: session.user.name,
    email,
  });

  const user = await prisma.user.findFirst({
    where: {
      email: email,
      is_deleted: false,
    },
  });

  return new Response(
    JSON.stringify({
      user,
    }),
    {
      status: 200,
      statusText: "perfil de usuario.",
    }
  );
}
