import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { headers } from "next/headers";
import { dedcodeToken } from "@/utils/jwt-utils";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  let email = session?.user?.email;

  if (session === null) {
    const authHeader = headers().get("authorization");

    if (authHeader != null) {
      const tokenDecoded = dedcodeToken(
        authHeader.replace("Bearer", "").split(" ")[1]
      );

      if (!tokenDecoded) {
        return new Response(
          JSON.stringify({
            errorMsg: "no autorizado",
          }),
          {
            status: 401,
            statusText: "no tienes privilegios para eliminar.",
          }
        );
      }

      email = tokenDecoded.email;
    } else {
      return new Response(
        JSON.stringify({
          errorMsg: "no autorizado",
        }),
        {
          status: 401,
          statusText: "no tienes privilegios para eliminar.",
        }
      );
    }
  }

  const user = await prisma.account.update({
    where: {
      email: email,
    },
    data: {
      is_deleted: true,
    },
  });

  return new Response(
    JSON.stringify({
      status: "Eliminado",
      user,
    }),
    {
      status: 200,
      statusText: "deleted.",
    }
  );
}
