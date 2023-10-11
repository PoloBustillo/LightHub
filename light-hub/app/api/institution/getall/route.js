import prisma from "@/lib/prisma";

import * as Sentry from "@sentry/nextjs";

export async function GET(req) {
  console.log("HERE");

  const institutions = await prisma.institution.findMany({
    include: {
      user: true,
      user: {
        select: {
          name: true,
          user_id: true,
        },
      },
    },
  });

  return new Response(
    JSON.stringify({
      institutions,
    }),
    {
      status: 200,
      statusText: "perfil de usuario.",
    }
  );
}
