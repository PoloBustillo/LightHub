import jwt from "jsonwebtoken";

export const signToken = (user) => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  return jwt.sign(
    // payload
    { ...user },

    // Seed
    process.env.NEXTAUTH_SECRET,

    // Opciones
    { expiresIn: "30d" }
  );
};

export const isValidToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  if (token.length <= 10) {
    return Promise.reject("JWT no es válido");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "", (err, payload) => {
        if (err) return reject("JWT no es válido");

        const { _id } = payload;

        resolve(_id);
      });
    } catch (error) {
      reject("JWT no es válido");
    }
  });
};
