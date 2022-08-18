<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const props = defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
}>();

const player = usePlayer();

const playerState = ref<Spotify.PlaybackState>();
watchEffect(() => {
  player.value?.addListener("player_state_changed", (state) => {
    playerState.value = state;
  });
});

const refreshTimer = ref(
  setInterval(async () => {
    if (!(playerState.value?.paused ?? true)) {
      playerState.value = (await player.value.getCurrentState()) ?? undefined;
    }
  }, 1000)
);
onUnmounted(() => {
  clearInterval(refreshTimer.value);
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

<style>
.slider[type="range"] {
  display: block;
  height: 100%;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  --playerScrubberFill: rgba(0, 0, 0, 0.5);
  --playerScrubberTrack: rgba(0, 0, 0, 0.1);
  @apply dark:[--playerScrubberFill:rgba(255,_255,_255,_0.6)] dark:[--playerScrubberTrack:rgba(255,_255,_255,_0.1)];
}

.slider[type="range"]::-ms-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}

.slider[type="range"]::-webkit-slider-runnable-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}
</style>
