import { useLocalStorage } from "@vueuse/core";

export interface SpotifyAuthResp {
  access_token?: string;
  expires_in?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

export function useParamsTokens() {
  const spotifyTokens = useLocalStorage<SpotifyAuthResp>("spotifyTokens", {});

  const params = new URLSearchParams(window.location.search);
  spotifyTokens.value = {
    access_token:
      params.get("access_token") ?? spotifyTokens.value.access_token,
    expires_in: params.get("expires_in") ?? spotifyTokens.value.expires_in,
    refresh_token:
      params.get("refresh_token") ?? spotifyTokens.value.refresh_token,
    scope: params.get("scope") ?? spotifyTokens.value.scope,
    token_type: params.get("token_type") ?? spotifyTokens.value.token_type,
  };

  const refreshAccessToken = async () => {
    const resp = await fetch(
      `http://localhost:8888/auth/refresh?refresh_token=${spotifyTokens.value?.refresh_token}`
    );
    const data: SpotifyAuthResp = await resp.json();
    spotifyTokens.value = { ...spotifyTokens.value, ...data };
    return data.access_token;
  };

  return { spotifyTokens, refreshAccessToken };
}
