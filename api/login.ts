import type { VercelRequest, VercelResponse } from "@vercel/node";

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default (req: VercelRequest, res: VercelResponse) => {
  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-modify-private",
  ].join(" ");
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID as string,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI as string,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
};
