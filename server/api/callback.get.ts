export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const form = new URLSearchParams({
    grant_type: "authorization_code",
    code: query.code as string,
    redirect_uri: `${process.env.APP_URL}/api/callback`
  });

  const data = await $fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64")
    },
    body: form
  });
  const params = new URLSearchParams(data as any);
  return sendRedirect(
    event,
    `${process.env.APP_URL}?callback&${params.toString()}`
  );
});
