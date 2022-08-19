<script setup lang="ts">
const spotifyApi = useApi();

const connected = computed(
  () => spotifyApi.value.getAccessToken() !== undefined
);
</script>

<template>
  <div
    class="h-full grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  >
    <Header
      :spotify-api="spotifyApi"
      class="row-span-2 w-[250px] border-r border-base-300 bg-base-200 overflow-y-scroll"
    />

    <div class="h-[60px] border-b border-base-200 shadow-sm">
      <Player v-if="connected" :spotify-api="spotifyApi" class="h-full" />
      <Login v-else />
    </div>

    <slot />
  </div>
</template>
