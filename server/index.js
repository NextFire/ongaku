// @ts-check
import { config } from "dotenv";
import express from "express";
import request from "request";

config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("Spotify client id or secret not set");
}

const HOST = process.env.HOST || "http://localhost";
const PORT = parseInt(process.env.PORT || "8888");
const BASE_URL = `${HOST}:${PORT}`;

const LOGIN_ROUTE = "/auth/login";
const CALLBACK_ROUTE = "/auth/callback";
const REFRESH_ROUTE = "/auth/refresh";

const TAURI_URL = process.env.TAURI_URL || "tauri://localhost";

/**
 * @param {number} length
 */
function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get(LOGIN_ROUTE, (req, res) => {
  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join(" ");
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: `${BASE_URL}${CALLBACK_ROUTE}`,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get(CALLBACK_ROUTE, (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: `${BASE_URL}${CALLBACK_ROUTE}`,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const params = new URLSearchParams(body);
      res.send(
        `<a href="${TAURI_URL}?${params.toString()}">Click here to continue</a>`
      );
    }
  });
});

app.get(REFRESH_ROUTE, (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Login at ${BASE_URL}${LOGIN_ROUTE}`);
});
