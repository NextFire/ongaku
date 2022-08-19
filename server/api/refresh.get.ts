export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const form = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: query.refresh_token as string
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
  return data;
});
