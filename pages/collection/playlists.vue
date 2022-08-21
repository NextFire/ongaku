<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const items = ref<SpotifyApi.PlaylistObjectSimplified[]>([]);
const resp = await spotifyApi.value.getUserPlaylists();
items.value = resp.items;
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <CollectionTile
      v-for="item in items"
      :key="item.id"
      type="playlist"
      :collection="item"
    />
  </div>
</template>
