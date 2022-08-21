<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const items = ref<SpotifyApi.SavedShowObject[]>([]);
const resp = await spotifyApi.value.getMySavedShows();
items.value = resp.items;
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <CollectionTile
      v-for="item in items"
      :key="item.show.id"
      type="show"
      :collection="item.show"
    />
  </div>
</template>
