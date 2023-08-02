<script setup lang="ts">
const showTime = ref(false);

const { spotifyApi } = useSpotifyApi();
const state = await useSpotifyState();

const progressPercent = computed(() => {
  return (state.value.progress_ms / state.value.item?.duration_ms) * 100;
});
</script>

<template>
  <div class="flex rounded bg-base-300">
    <div class="h-full aspect-square">
      <img
        :src="state.item?.album.images[0]?.url"
        class="object-contain hover:brightness-75 rounded-l"
      />
    </div>
    <div
      @mouseenter="showTime = true"
      @mouseleave="showTime = false"
      class="flex-1 grid grid-rows-[auto_4px] grid-flow-row relative"
    >
      <div class="grid grid-rows-2 text-center m-2 text-xs">
        <NuxtLink
          :to="`/album/${state.item?.album.id}#${state.item?.id}`"
          class="truncate self-end"
        >
          {{ state.item?.name }}
        </NuxtLink>
        <span class="truncate self-start">
          <span>
            {{ state.item?.artists.map((a) => a.name).join(", ") }}
          </span>
          <span> – </span>
          <NuxtLink :to="`/album/${state.item?.album.id}`">
            {{ state.item?.album.name }}
          </NuxtLink>
        </span>
      </div>
      <input
        type="range"
        :max="state.item?.duration_ms"
        :value="state.progress_ms"
        @change="(e) => {spotifyApi.seek((e.target as HTMLInputElement).valueAsNumber)}"
        class="w-full slider"
        :style="`--progress: ${progressPercent}%`"
      />
      <Transition>
        <div
          v-if="showTime"
          class="absolute bottom-1 w-full px-1 flex place-content-between text-[10px]"
        >
          <span>
            {{ millisToMinutesAndSeconds(state.progress_ms) }}
          </span>
          <span>
            {{ millisToMinutesAndSeconds(state.item?.duration_ms) }}
          </span>
        </div>
      </Transition>
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
