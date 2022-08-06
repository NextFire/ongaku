<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "@vue/reactivity";

library.add(faBackward, faForward, faPause, faPlay, faRepeat, faShuffle);

const props = defineProps<{
  player?: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

const btnClass = computed(() => [
  { "btn-disabled": !props.player },
  "btn btn-sm btn-ghost",
]);

async function onBackward() {
  const state = await props.player?.getCurrentState();
  if (state?.position && state.position <= 3000) {
    props.player?.previousTrack();
  } else {
    props.player?.seek(0);
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button @click="" :class="btnClass">
      <FontAwesomeIcon icon="fa-solid fa-shuffle" />
    </button>
    <button @click="onBackward" :class="btnClass">
      <FontAwesomeIcon icon="fa-solid fa-backward" class="fa-lg" />
    </button>
    <button @click="player?.togglePlay" :class="btnClass">
      <FontAwesomeIcon
        :icon="[
          'fa-solid',
          playbackState?.paused ?? true ? 'fa-play' : 'fa-pause',
        ]"
        class="fa-2x"
      />
    </button>
    <button @click="player?.nextTrack" :class="btnClass">
      <FontAwesomeIcon icon="fa-solid fa-forward" class="fa-lg" />
    </button>
    <button @click="" :class="btnClass">
      <FontAwesomeIcon icon="fa-solid fa-repeat" />
    </button>
  </div>
</template>
