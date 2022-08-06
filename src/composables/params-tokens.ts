import { onMounted, ref } from "vue";

export interface SpotifyAuthResp {
  accessToken: string | null;
  expiresIn: string | null;
  refreshToken: string | null;
  scope: string | null;
  tokenType: string | null;
}

export function useParamsTokens() {
  const spotifyTokens = ref<SpotifyAuthResp>();

  onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");
    const refreshToken = params.get("refresh_token");
    const scope = params.get("scope");
    const tokenType = params.get("token_type");
    spotifyTokens.value = {
      accessToken,
      expiresIn,
      refreshToken,
      scope,
      tokenType,
    };
  });

  return { spotifyTokens };
}
