import { useLocalStorage } from "@vueuse/core";

export interface SpotifyAuthResp {
  accessToken?: string;
  expiresIn?: string;
  refreshToken?: string;
  scope?: string;
  tokenType?: string;
}

export function useParamsTokens() {
  const spotifyTokens = useLocalStorage<SpotifyAuthResp>("spotifyTokens", {});

  const params = new URLSearchParams(window.location.search);
  spotifyTokens.value = {
    accessToken: params.get("access_token") ?? spotifyTokens.value.accessToken,
    expiresIn: params.get("expires_in") ?? spotifyTokens.value.expiresIn,
    refreshToken:
      params.get("refresh_token") ?? spotifyTokens.value.refreshToken,
    scope: params.get("scope") ?? spotifyTokens.value.scope,
    tokenType: params.get("token_type") ?? spotifyTokens.value.tokenType,
  };

  const refreshAccessToken = async () => {
    const resp = await fetch(
      `http://localhost:8888/auth/refresh?refresh_token=${spotifyTokens.value?.refreshToken}`
    );
    const data = await resp.json();
    spotifyTokens.value = { ...spotifyTokens.value, ...data };
    return spotifyTokens.value?.accessToken;
  };

  return { spotifyTokens, refreshAccessToken };
}
