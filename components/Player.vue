<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const props = defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  refreshAccessToken: () => Promise<string | undefined>;
}>();

if (!window.Spotify) {
  await new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };
  });
}

const player = ref(
  new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: async (cb) => {
      cb((await props.refreshAccessToken())!);
    }
  })
);
const playerState = ref<Spotify.PlaybackState>();

player.value.addListener("ready", ({ device_id }) => {
  console.log("Connected with Device ID", device_id);
});
player.value.addListener("not_ready", ({ device_id }) => {
  console.log("Device ID is not ready for playback", device_id);
});
player.value.addListener("player_state_changed", (state) => {
  console.log("State changed", state);
  playerState.value = state;
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

await player.value.connect();

const refreshTimer = ref(
  setInterval(async () => {
    if (!(playerState.value?.paused ?? true)) {
      playerState.value = (await player.value.getCurrentState()) ?? undefined;
    }
  }, 1000)
);

onUnmounted(() => {
  clearInterval(refreshTimer.value);
  player.value.disconnect();
});
</script>

<template>
  <div class="p-1 grid grid-cols-[30%_40%_30%]">
    <PlayerControls
      :spotify-api="spotifyApi"
      :player="player"
      :playback-state="playerState"
    />
    <PlayerDisplay
      :spotify-api="spotifyApi"
      :player="player"
      :playback-state="playerState"
    />
    <PlayerMeta
      :spotify-api="spotifyApi"
      :player="player"
      :playback-state="playerState"
    />
  </div>
</template>
