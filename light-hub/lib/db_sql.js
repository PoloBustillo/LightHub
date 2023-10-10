// import * as Sentry from "@sentry/nextjs";
// import mysql from "mysql2";

// const { DATABASE_URL } = process.env;

// if (!DATABASE_URL) {
//   throw new Error("Variable DATABASE_URL no esta configurado en tu ambiente");
// }

// // Create the connection to the database

// export const connectSQLDB = async () => {
//   try {
//     const connection = await mysql.createConnection(process.env.DATABASE_URL);
//     connection.query("show tables", function (err, results, fields) {});
//   } catch (error) {
//     return Promise.reject(false);
//   }
// };
