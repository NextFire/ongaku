import type { VercelRequest, VercelResponse } from "@vercel/node";
import request from "request";

export default (req: VercelRequest, res: VercelResponse) => {
  const refresh_token = req.query.refresh_token as string;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
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
      res.json(body);
    }
  });
};
