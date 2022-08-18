import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const form = new URLSearchParams({
    grant_type: "authorization_code",
    code: query.code as string,
    redirect_uri: `${process.env.APP_URL}/api/callback`
  });

  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    form,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  const params = new URLSearchParams(resp.data);
  return sendRedirect(event, `${process.env.APP_URL}?${params.toString()}`);
});
