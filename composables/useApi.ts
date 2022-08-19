import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = ref(new SpotifyWebApi());

const { accessToken } = useAccessToken();
watchEffect(() => {
  const api = new SpotifyWebApi();
  api.setAccessToken(accessToken.value);
  spotifyApi.value = api;
});

export const useApi = () => spotifyApi;
