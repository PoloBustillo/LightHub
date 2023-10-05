export async function GET(req, res) {
  return new Response(
    JSON.stringify({
      errorMsg: "no autorizado",
    }),
    {
      status: 401,
      statusText: "no tienes privilegios",
    }
  );
}
