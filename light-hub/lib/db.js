import mongoose from "mongoose";

const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error("Variable DB_URL no esta configurado en tu ambiente");
}
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URL);
    if (connection.readyState === 1) {
      console.log("Conectado a la DB!!");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(false);
  }
};
