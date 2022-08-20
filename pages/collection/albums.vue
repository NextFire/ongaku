<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const items = ref<SpotifyApi.SavedAlbumObject[]>([]);
const resp = await spotifyApi.value.getMySavedAlbums();
items.value = resp.items;
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <AlbumTile v-for="item in items" :key="item.album.id" :album="item.album" />
  </div>
</template>
