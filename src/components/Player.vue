<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import PlayerControls from "./PlayerControls.vue";
import PlayerDisplay from "./PlayerDisplay.vue";
import PlayerMeta from "./PlayerMeta.vue";

const props = defineProps<{ accessToken: string }>();

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
    getOAuthToken: (cb) => {
      cb(props.accessToken);
    },
  })
);
await player.value.connect();

const playerState = ref<Spotify.PlaybackState>();
player.value.addListener("player_state_changed", (state) => {
  playerState.value = state;
});

const refreshTimer = ref(
  setInterval(async () => {
    if (!(playerState.value?.paused ?? true)) {
      playerState.value = (await player.value?.getCurrentState()) ?? undefined;
    }
  }, 1000)
);

onUnmounted(() => {
  player.value.disconnect();
  clearInterval(refreshTimer.value);
});
</script>

<template>
  <div class="p-1 grid grid-cols-[30%_40%_30%]">
    <PlayerControls :player="player" :playback-state="playerState" />
    <PlayerDisplay :player="player" :playback-state="playerState" />
    <PlayerMeta :player="player" :playback-state="playerState" />
  </div>
</template>
