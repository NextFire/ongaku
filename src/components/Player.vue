<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import usePlaybackSdk from "../composables/playback-sdk";
import PlayerControls from "./PlayerControls.vue";
import PlayerDisplay from "./PlayerDisplay.vue";
import PlayerMeta from "./PlayerMeta.vue";

const props = defineProps<{ accessToken: string }>();

const player = ref<Spotify.Player>();
const playerState = ref<Spotify.PlaybackState>();

const { ready } = usePlaybackSdk();
const refreshTimer = ref<NodeJS.Timer>();

onMounted(async () => {
  await ready;

  const newPlayer = new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: (cb) => {
      cb(props.accessToken);
    },
  });
  player.value = newPlayer;

  newPlayer.connect();

  newPlayer.addListener("player_state_changed", (state) => {
    playerState.value = state;
  });

  refreshTimer.value = setInterval(async () => {
    if (!(playerState.value?.paused ?? true)) {
      playerState.value = (await player.value?.getCurrentState()) || undefined;
    }
  }, 1000);
});

onUnmounted(() => {
  player.value?.disconnect();
  player.value = undefined;
  clearInterval(refreshTimer.value);
  refreshTimer.value = undefined;
});
</script>

<template>
  <template v-if="player">
    <div class="p-1 grid grid-cols-[30%_40%_30%]">
      <PlayerControls :player="player" :playback-state="playerState" />
      <PlayerDisplay :player="player" :playback-state="playerState" />
      <PlayerMeta :player="player" :playback-state="playerState" />
    </div>
  </template>
</template>
