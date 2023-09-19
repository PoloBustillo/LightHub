import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ saludo: "Hola Polo" });
}
