<script setup lang="ts">
function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const showTime = ref(false);

const { spotifyApi } = useSpotifyApi();
const state = await useSpotifyState();

const trackAlbum = computed(() => {
  const artists = state.value.item.artists.map((a) => a.name).join(", ");
  const album = state.value.item.album.name;
  return [artists, album]
    .filter((v) => v !== undefined && v.length > 0)
    .join(" — ");
});

const progressPercent = computed(() => {
  return (state.value.progress_ms / state.value.item.duration_ms) * 100;
});
</script>

<template>
  <div class="flex rounded bg-base-300">
    <div class="h-full aspect-square">
      <img :src="state.item.album.images[0]?.url" class="object-contain" />
    </div>
    <div
      @mouseenter="showTime = true"
      @mouseleave="showTime = false"
      class="grow grid grid-rows-[auto_4px] grid-flow-row"
    >
      <div class="grid grid-rows-2 text-center m-2 text-xs">
        <span class="truncate self-end">
          {{ state.item.name }}
        </span>
        <span class="truncate self-start">
          {{ trackAlbum }}
        </span>
      </div>
      <div class="text-xs">
        <input
          type="range"
          :max="state.item.duration_ms"
          :value="state.progress_ms"
          @change="(e) => {spotifyApi.seek((e.target as HTMLInputElement).valueAsNumber)}"
          class="w-full slider"
          :style="`--progress: ${progressPercent}%`"
        />
        <Transition>
          <div
            v-if="showTime"
            class="relative -top-5 mx-1 flex place-content-between text-[10px]"
          >
            <span>
              {{ millisToMinutesAndSeconds(state.progress_ms) }}
            </span>
            <span>
              {{ millisToMinutesAndSeconds(state.item.duration_ms) }}
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
