import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const form = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: query.refresh_token as string
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
  return resp.data;
});
