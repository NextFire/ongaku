<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const items = ref<SpotifyApi.SavedAlbumObject[]>([]);
const resp = await spotifyApi.value.getMySavedAlbums();
items.value = resp.items;
</script>

<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div
      v-for="item in items"
      :key="item.album.id"
      @click="spotifyApi.play({ context_uri: item.album.uri })"
      class="cursor-pointer"
    >
      <img
        :src="item.album.images[0].url"
        class="rounded drop-shadow-sm border hover:brightness-75"
      />
      <div class="h-10 mt-1 flex flex-col text-xs">
        <span class="font-semibold">{{ item.album.name }}</span>
        <span>{{ item.album.artists.map((a) => a.name).join(", ") }}</span>
      </div>
    </div>
  </div>
</template>
