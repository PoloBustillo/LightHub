import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import logger from "@/app/logger";

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

  const id = session.user.user_id;
  Sentry.setContext("user", {
    name: session.user.name,
    id: id,
  });
  const body = await req.json();

  let {
    password = undefined,
    name = undefined,
    picture = undefined,
    user_bio = undefined,
    city = undefined,
    zip_code = undefined,
    is_active = undefined,
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
    //TODO: ADD SKILLS PROJECT INSTITUTIONS

    const user = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        name: name,
        picture_url: picture,
        user_bio: user_bio,
        city: city,
        zip_code: zip_code,
        is_active: is_active,
        account: {
          password:
            password !== undefined ? bcrypt.hashSync(password) : undefined,
        },
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
    logger.error(error);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 400,
      statusText: "Fallo actualizacion del usuario",
    });
  }
}
