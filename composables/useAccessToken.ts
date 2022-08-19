export interface SpotifyAuthResp {
  access_token?: string;
  expires_in?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

export const useAccessToken = () => {
  const spotifyTokens = useLocalStorage<SpotifyAuthResp>("spotifyTokens", {});
  if (
    ![
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "playlist-read-private",
      "playlist-modify-private"
    ].every((scope) => spotifyTokens.value.scope?.includes(scope))
  ) {
    spotifyTokens.value = {};
  }

  const accessToken = computed(() => spotifyTokens.value.access_token);

  const params = new URLSearchParams(window.location.search);
  spotifyTokens.value = {
    access_token:
      params.get("access_token") ?? spotifyTokens.value.access_token,
    expires_in: params.get("expires_in") ?? spotifyTokens.value.expires_in,
    refresh_token:
      params.get("refresh_token") ?? spotifyTokens.value.refresh_token,
    scope: params.get("scope") ?? spotifyTokens.value.scope,
    token_type: params.get("token_type") ?? spotifyTokens.value.token_type
  };

  const refreshAccessToken = async () => {
    const data = await $fetch<SpotifyAuthResp>(
      `/api/refresh?refresh_token=${spotifyTokens.value.refresh_token}`
    );
    spotifyTokens.value = { ...spotifyTokens.value, ...data };
    setTimeout(refreshAccessToken, parseInt(data.expires_in) * 1000);
    return data.access_token;
  };

  return { accessToken, refreshAccessToken };
};
