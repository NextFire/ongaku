import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = ref<SpotifyWebApi.SpotifyWebApiJs>();
const connected = ref(false);

const { accessToken } = useSpotifyToken();
watchEffect(() => {
  const api = new SpotifyWebApi();
  api.setAccessToken(accessToken.value);
  spotifyApi.value = api;
  api.getMe().then(() => {
    connected.value = true;
  });
});

export const useSpotifyApi = () => {
  return { spotifyApi, connected };
};
