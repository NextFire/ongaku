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
import SpotifyWebApi from "spotify-web-api-js";

library.add(faBackward, faForward, faPause, faPlay, faRepeat, faShuffle);

const props = defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

async function onBackward() {
  if (props.playbackState?.position && props.playbackState?.position <= 3000) {
    props.player.previousTrack();
  } else {
    props.player.seek(0);
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button @click="" class="btn btn-sm btn-ghost">
      <FontAwesomeIcon icon="fa-solid fa-shuffle" />
    </button>
    <button @click="onBackward" class="btn btn-sm btn-ghost">
      <FontAwesomeIcon icon="fa-solid fa-backward" class="fa-lg" />
    </button>
    <button @click="player.togglePlay" class="btn btn-sm btn-ghost">
      <FontAwesomeIcon
        :icon="[
          'fa-solid',
          playbackState?.paused ?? true ? 'fa-play' : 'fa-pause',
        ]"
        class="fa-2x"
      />
    </button>
    <button @click="player.nextTrack" class="btn btn-sm btn-ghost">
      <FontAwesomeIcon icon="fa-solid fa-forward" class="fa-lg" />
    </button>
    <button @click="" class="btn btn-sm btn-ghost">
      <FontAwesomeIcon icon="fa-solid fa-repeat" />
    </button>
  </div>
</template>
