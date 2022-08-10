import type { VercelRequest, VercelResponse } from "@vercel/node";
import request from "request";

export default (req: VercelRequest, res: VercelResponse) => {
  const code = req.query.code as string;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const params = new URLSearchParams(body);
      res.redirect(`${process.env.APP_URL}?${params.toString()}`);
    }
  });
};
