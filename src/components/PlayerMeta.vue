<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVolumeHigh, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, watch } from "vue";

library.add(faVolumeLow, faVolumeHigh);

const props = defineProps<{
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

const volume = ref<number>(0.25);

watch([() => props.playbackState?.paused, volume], ([paused, volume]) => {
  if (!(paused ?? true)) props.player.setVolume(volume);
});
</script>

<template>
  <div class="flex items-center justify-center gap-x-2">
    <FontAwesomeIcon icon="fa-solid fa-volume-low" class="fa-sm" />
    <input type="range" max="1" step="0.01" v-model="volume" class="w-[75px]" />
    <FontAwesomeIcon icon="fa-solid fa-volume-high" class="fa-sm" />
  </div>
</template>
