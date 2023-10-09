import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/utils/jwt-utils";

export async function POST(req, res) {
  const body = await req.json();
  const { email = "", password = "" } = body;
  Sentry.setContext("user", {
    email,
  });

  if (!password || !email) {
    return new Response(
      JSON.stringify({
        errorMsg: "password y email son requeridos",
      }),
      {
        status: 400,
        statusText: "atributos requeridos.",
      }
    );
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      if (user.is_deleted == true) {
        return new Response(
          JSON.stringify({
            error: "usuario fue eliminado, vuelva a crear cuenta.",
          }),
          {
            status: 401,
            statusText: "Fallo validacion de usuario",
          }
        );
      }

      const { password: userPassword, ...userWithoutPass } = user;
      if (!bcrypt.compareSync(password, userPassword)) {
        return new Response(
          JSON.stringify({
            error: "password no coincide",
          }),
          {
            status: 401,
            statusText: "Fallo validacion de usuario",
          }
        );
      }
      const token = signToken(userWithoutPass);

      return new Response(
        JSON.stringify({
          token,
          ...userWithoutPass,
        }),
        {
          status: 200,
          statusText: "usuario valido.",
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "usuario no encontrado",
        }),
        {
          status: 404,
          statusText: "Fallo validacion de usuario",
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 400,
        statusText: "Fallo validacion de usuario",
      }
    );
  }
}
