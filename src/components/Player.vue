<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import usePlaybackSdk from "../composables/playback-sdk";

const props = defineProps<{ accessToken: string }>();

const spotifyPlayer = ref<Spotify.Player>();

const isPaused = ref(false);
const isActive = ref(false);
const currentTrack = ref({
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
});

const { ready } = usePlaybackSdk();

onMounted(async () => {
  await ready;
  const player = new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: (cb) => {
      cb(props.accessToken);
    },
    volume: 0.1,
  });
  spotifyPlayer.value = player;
  player.connect();
});

onUnmounted(() => {
  spotifyPlayer.value?.disconnect();
  spotifyPlayer.value = undefined;
});

watch(spotifyPlayer, (player) => {
  if (player) {
    player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      currentTrack.value = state.track_window.current_track;
      isPaused.value = state.paused;

      player.getCurrentState().then((state) => {
        !state ? (isActive.value = false) : (isActive.value = true);
      });
    });
  }
});
</script>

<template>
  <div></div>
</template>
