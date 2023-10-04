import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Sentry from "@sentry/nextjs";
import { isValidEmail } from "../../../utils/validations";

export async function POST(req, res) {
  const body = await req.json();

  const { email = "", password = "", name = "" } = body;
  Sentry.setContext("user", {
    name,
    email,
  });

  if (password.length < 6) {
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

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  const newUser = {
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    user_name: name,
  };

  if (user) {
    const { password, ...userWithoutPass } = user;
    return new Response(
      JSON.stringify({
        ...userWithoutPass,
      }),
      {
        status: 400,
        statusText: "Usuario ya existe.",
      }
    );
  }

  try {
    const createdUser = await prisma.user.create({
      data: newUser,
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
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 400,
        statusText: "Fallo creación de usuario",
      }
    );
  }
}
