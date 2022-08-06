<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import usePlaybackSdk from "../composables/playback-sdk";
import PlayerControls from "./PlayerControls.vue";

const props = defineProps<{ accessToken: string }>();

const player = ref<Spotify.Player>();

const playerState = ref<Spotify.PlaybackState>();

const { ready } = usePlaybackSdk();

onMounted(async () => {
  await ready;

  const newPlayer = new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: (cb) => {
      cb(props.accessToken);
    },
    volume: 0.1,
  });
  player.value = newPlayer;

  newPlayer.connect();

  newPlayer.addListener("player_state_changed", (state) => {
    playerState.value = state;
  });
});

onUnmounted(() => {
  player.value?.disconnect();
  player.value = undefined;
});
</script>

<template>
  <div class="grid grid-cols-[30%_40%_30%]">
    <PlayerControls :player="player" :playback-state="playerState" />
    <div></div>
    <div></div>
  </div>
</template>
