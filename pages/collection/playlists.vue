<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const playlists = ref<SpotifyApi.PlaylistObjectSimplified[]>([]);
const resp = await spotifyApi.value.getUserPlaylists();
playlists.value = resp.items;
</script>

<template>
  <div class="m-4 md:m-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <CollectionTile
      v-for="playlist in playlists"
      :key="playlist.id"
      type="playlist"
      :collection="playlist"
    />
  </div>
</template>
