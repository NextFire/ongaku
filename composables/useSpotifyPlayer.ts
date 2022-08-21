///  <reference types="@types/spotify-web-playback-sdk"/>

const player = ref<Spotify.Player>();
const deviceId = ref<string>();

export const useSpotifyPlayer = () => {
  const { refreshAccessToken } = useSpotifyToken();

  if (!player.value && !window.Spotify) {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      player.value = new Spotify.Player({
        name: "Ongaku",
        getOAuthToken: async (cb) => {
          cb((await refreshAccessToken())!);
        }
      });

      player.value.addListener("ready", ({ device_id }) => {
        console.log("Connected with Device ID", device_id);
        deviceId.value = device_id;
      });
      player.value.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID is not ready for playback", device_id);
      });
      player.value.addListener("player_state_changed", (state) => {
        console.log("State changed", state);
      });
      player.value.addListener("autoplay_failed", () => {
        console.log("Autoplay is not allowed by the browser autoplay rules");
      });
      player.value.on("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });
      player.value.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });
      player.value.on("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });
      player.value.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      player.value.connect();
    };
  }

  onUnmounted(() => {
    player.value?.disconnect();
  });

  return { player, deviceId };
};
