import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { isValidEmail } from "../../../../utils/validations";

export async function POST(req, res) {
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

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    const { password, ...userWithoutPass } = createdUser;
    return new Response(
      JSON.stringify({
        ...userWithoutPass,
      }),
      {
        status: 200,
        statusText: "user deleted.",
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 400,
      statusText: "Fallo creación de usuario",
    });
  }
}
