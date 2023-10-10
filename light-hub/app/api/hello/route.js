import { connectDB } from "@/lib/db";
import { connectSQLDB } from "@/lib/db_sql";
import { NextResponse } from "next/server";

export async function GET() {
  // await connectDB();
  // await connectSQLDB();
  return NextResponse.json({ saludo: "Hola Polo" });
}
