import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, res) {
  const session = await getServerSession(authOptions);

  if (session === null)
    return new Response(
      JSON.stringify({
        errorMsg: "no autorizado",
      }),
      {
        status: 401,
        statusText: "no tienes privilegios para actualizar perfil.",
      }
    );

  const ownerEmail = session.user.email;
  Sentry.setContext("user", {
    name: session.user.name,
    ownerEmail,
  });
  const body = await req.json();

  let {
    password = undefined,
    name = undefined,
    picture = undefined,
    user_bio = undefined,
  } = body;

  if (password !== undefined && password.length < 6) {
    return new Response(
      JSON.stringify({
        errorMsg: "La contraseña debe de ser de 6 caracteres",
      }),
      {
        status: 400,
        statusText: "password weak.",
      }
    );
  }

  if (name !== undefined && name.length < 5) {
    return new Response(
      JSON.stringify({
        errorMsg: "El nombre debe ser minimo 5 caracteres",
      }),
      {
        status: 400,
        statusText: "username weak.",
      }
    );
  }

  try {
    const user = await prisma.user.update({
      where: {
        email: ownerEmail,
      },
      data: {
        name: name,
        picture: picture,
        user_bio: user_bio,
        password:
          password !== undefined ? bcrypt.hashSync(password) : undefined,
      },
    });

    const { password: passwordUser, ...userWithoutPass } = user;
    return new Response(
      JSON.stringify({
        ...userWithoutPass,
      }),
      {
        status: 200,
        statusText: "user updated.",
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 400,
      statusText: "Fallo actualización del usuario",
    });
  }
}
