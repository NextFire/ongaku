<script setup lang="ts">
const props = defineProps<{
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

const showTime = ref(false);

const trackAlbum = computed(() => {
  const artists = props.playbackState?.track_window.current_track.artists
    .map((a) => a.name)
    .join(", ");
  const album = props.playbackState?.track_window.current_track.album.name;
  return [artists, album]
    .filter((v) => v !== undefined && v.length > 0)
    .join(" — ");
});

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const progressPercent = computed(() => {
  if (!props.playbackState) return 0;
  return (props.playbackState.position / props.playbackState.duration) * 100;
});
</script>

<template>
  <div class="flex rounded bg-base-300">
    <div class="h-full aspect-square">
      <img
        :src="playbackState?.track_window.current_track.album.images[0].url"
        class="object-contain"
      />
    </div>
    <div
      @mouseenter="showTime = true"
      @mouseleave="showTime = false"
      class="grow grid grid-rows-[auto_4px] grid-flow-row"
    >
      <div class="grid grid-rows-2 text-center m-2 text-xs">
        <span class="truncate self-end">
          {{ playbackState?.track_window.current_track.name }}
        </span>
        <span class="truncate self-start">
          {{ trackAlbum }}
        </span>
      </div>
      <div class="text-xs">
        <input
          type="range"
          :max="playbackState?.duration"
          :value="playbackState?.position"
          @change="(e) => player.seek((e.target as HTMLInputElement).valueAsNumber)"
          class="w-full slider"
          :style="`--progress: ${progressPercent}%`"
        />
        <Transition>
          <div
            v-if="showTime"
            class="relative -top-5 mx-1 flex place-content-between text-[10px]"
          >
            <span>
              {{ millisToMinutesAndSeconds(playbackState?.position ?? 0) }}
            </span>
            <span>
              {{ millisToMinutesAndSeconds(playbackState?.duration ?? 0) }}
            </span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
