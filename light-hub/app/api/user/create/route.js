import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { isValidEmail } from "../../../../utils/validations";
import logger from "@/app/logger";

export async function POST(req, res) {
  const body = await req.json();

  let { email = "", password = "", name = "", provider = "credentials" } = body;

  Sentry.setContext("user", {
    name,
    email,
  });

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({
        errorMsg: "name email y password son requeridos",
      }),
      {
        status: 400,
        statusText: "atributos requeridos.",
      }
    );
  }

  if (password.length < 6) {
    return new Response(
      JSON.stringify({
        errorMsg: "La contraseña debe de ser de 6 caracteres",
      }),
      {
        status: 400,
        statusText: "password debil.",
      }
    );
  }

  if (name.length < 2) {
    return new Response(
      JSON.stringify({
        errorMsg: "El nombre debe ser minimo 2 caracteres",
      }),
      {
        status: 400,
        statusText: "username weak.",
      }
    );
  }

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

  const user = await prisma.account.findFirst({
    where: {
      OR: [{ email: email }, { user: { name: name } }],
      AND: { is_deleted: false },
    },
  });

  if (user) {
    const { name, email } = user;
    return new Response(
      JSON.stringify({
        name,
        email,
      }),
      {
        status: 400,
        statusText: "Usuario o Email ya existe.",
      }
    );
  }

  const newUser = {
    email: email.toLocaleLowerCase().trim(),
    password: bcrypt.hashSync(password),
    login_provider: provider,
  };

  try {
    const createdUser = await prisma.account.create({
      data: {
        ...newUser,
        user: {
          create: { name },
        },
      },
    });
    const { password, ...userWithoutPass } = createdUser;
    return new Response(
      JSON.stringify({
        ...userWithoutPass,
      }),
      {
        status: 200,
        statusText: "user created.",
      }
    );
  } catch (error) {
    logger.error(error, "Create User API ERROR");
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 400,
      statusText: "Fallo creación de usuario",
    });
  }
}
