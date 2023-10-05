import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { isValidEmail } from "../../../../utils/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, res) {
  const session = await getServerSession(authOptions);
  console.log("SESSION", session);
  // if (session) {
  //   // Signed in
  //   console.log("Session", JSON.stringify(session, null, 2));
  // } else {
  //   // Not Signed in
  //   res.status(401);
  // }

  const body = await req.json();

  let { email = "" } = body;

  Sentry.setContext("user", {
    email,
  });

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({
        errorMsg: "El correo no es valido",
      }),
      {
        status: 400,
        statusText: "email invalid.",
      }
    );
  }
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
  }
  return new Response(
    JSON.stringify({
      status: "Eliminado",
    }),
    {
      status: 200,
      statusText: "deleted.",
    }
  );
}
