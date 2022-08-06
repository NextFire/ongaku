import { onMounted } from "vue";

export default function usePlaybackSdk() {
  let resolve: () => void;

  const ready = new Promise<void>((r) => {
    resolve = r;
  });

  onMounted(() => {
    if (window.Spotify) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      };
    }
  });

  return { ready };
}
