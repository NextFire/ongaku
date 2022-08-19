function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default defineEventHandler((event) => {
  const scope = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-modify-private",
    "streaming",
    "user-read-private",
    "user-library-modify",
    "user-library-read"
  ].join(" ");
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID as string,
    scope: scope,
    redirect_uri: `${process.env.APP_URL}/api/callback`,
    state: state
  });

  return sendRedirect(
    event,
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});
