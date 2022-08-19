export interface SpotifyAuthResp {
  access_token?: string;
  expires_in?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  lastRefresh?: number;
}

export const useToken = () => {
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

  const connected = computed(
    () =>
      spotifyTokens.value.access_token &&
      spotifyTokens.value.lastRefresh +
        parseInt(spotifyTokens.value.expires_in) * 1000 >
        Date.now()
  );

  const params = new URLSearchParams(window.location.search);
  if (params.has("callback")) {
    spotifyTokens.value = {
      access_token: params.get("access_token"),
      expires_in: params.get("expires_in"),
      refresh_token: params.get("refresh_token"),
      scope: params.get("scope"),
      token_type: params.get("token_type"),
      lastRefresh: Date.now()
    };
    window.history.pushState({}, "", window.location.pathname);
  }

  const refreshAccessToken = async () => {
    const data = await $fetch<SpotifyAuthResp>(
      `/api/refresh?refresh_token=${spotifyTokens.value.refresh_token}`
    );
    spotifyTokens.value = {
      ...spotifyTokens.value,
      ...data,
      lastRefresh: Date.now()
    };
    setTimeout(refreshAccessToken, parseInt(data.expires_in) * 1000);
    return data.access_token;
  };

  if (!connected.value && spotifyTokens.value.refresh_token) {
    refreshAccessToken();
  }

  return { accessToken, refreshAccessToken, connected };
};
