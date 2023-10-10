import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in

    return NextResponse.json(
      {
        message: "Autorizado",
      },
      {
        status: 200,
      }
    );
  } else {
    // Not Signed in
    return NextResponse.json(
      {
        message: "No autorizado",
      },
      {
        status: 401,
      }
    );
  }
}
