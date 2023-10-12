import prisma from "@/lib/prisma";

import * as Sentry from "@sentry/nextjs";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);

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

  let id = session.user.user_id;

  Sentry.setContext("user", {
    name: session.user.name,
    id: id,
  });

  const user = await prisma.user.findFirst({
    where: {
      user_id: id,
      account: { is_deleted: false },
    },
    include: {
      account: {
        select: {
          email: true,
        },
      },
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
