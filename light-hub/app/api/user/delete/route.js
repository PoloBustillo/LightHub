import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { headers } from "next/headers";
import { dedcodeToken } from "@/utils/jwt-utils";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  let email = session?.user?.email;

  if (session === null) {
    return new Response(
      JSON.stringify({
        errorMsg: "no autorizado",
      }),
      {
        status: 401,
        statusText: "no tienes privilegios para eliminar.",
      }
    );
  } else {
    const authHeader = headers().get("authorization");

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
  }

  const user = await prisma.user.update({
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
