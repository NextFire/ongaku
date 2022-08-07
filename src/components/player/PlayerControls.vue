<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

const isShuffling = ref(false);
const repeatState = ref(0);

const REPEAT_STATES: SpotifyApi.PlaybackRepeatState[] = [
  "off",
  "context",
  "track",
];

async function onBackward() {
  if (props.playbackState?.position && props.playbackState?.position <= 3000) {
    props.player.previousTrack();
  } else {
    props.player.seek(0);
  }
}

watchEffect(() => {
  props.spotifyApi.setShuffle(isShuffling.value);
});

watchEffect(() => {
  props.spotifyApi.setRepeat(REPEAT_STATES[repeatState.value]);
});
</script>

<template>
  <div class="flex items-center justify-center">
    <button
      @click="isShuffling = !isShuffling"
      class="btn btn-sm"
      :class="{ 'btn-ghost': !isShuffling }"
    >
      <font-awesome-icon icon="fa-solid fa-shuffle" />
    </button>
    <button @click="onBackward" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-backward" class="fa-lg" />
    </button>
    <button @click="player.togglePlay" class="btn btn-sm btn-ghost">
      <font-awesome-icon
        :icon="[
          'fa-solid',
          playbackState?.paused ?? true ? 'fa-play' : 'fa-pause',
        ]"
        class="fa-2x"
      />
    </button>
    <button @click="player.nextTrack" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-forward" class="fa-lg" />
    </button>
    <button
      @click="repeatState = (repeatState + 1) % 3"
      class="btn btn-sm space-x-1"
      :class="{
        'btn-ghost': repeatState === 0,
        'btn-secondary': repeatState === 2,
      }"
    >
      <font-awesome-icon icon="fa-solid fa-repeat" />
      <span v-if="repeatState === 2">1</span>
    </button>
  </div>
</template>
