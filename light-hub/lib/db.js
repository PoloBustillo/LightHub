import mongoose from "mongoose";
import * as Sentry from "@sentry/nextjs";

const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error("Variable DB_URL no esta configurado en tu ambiente");
}
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URL);
    if (connection.readyState === 1) {
      Sentry.captureMessage("Conectado a MongoDB", "info");

      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
};
