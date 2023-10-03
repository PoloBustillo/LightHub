import prisma from "@/lib/prisma";

export async function POST(request) {
  console.log("LOGIN API");
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user) {
    const { password, ...userWithoutPass } = user;

    const result = user;
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
