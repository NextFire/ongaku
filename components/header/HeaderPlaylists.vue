<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const resp = await spotifyApi.value.getUserPlaylists();
const playlists = ref(resp.items);
</script>

<template>
  <div>
    <li class="menu-title">
      <span>Playlists</span>
    </li>
    <li>
      <NuxtLink
        to="/collection/playlists"
        :class="{ active: $route.name === 'collection-playlists' }"
      >
        <font-awesome-icon icon="fa-solid fa-table-cells" />
        All Playlists
      </NuxtLink>
    </li>
    <li v-for="playlist in playlists" :key="playlist.id">
      <NuxtLink
        :to="`/playlist/${playlist.id}`"
        :class="{
          active:
            $route.name === 'playlist-id' && $route.params.id === playlist.id
        }"
      >
        <font-awesome-icon icon="fa-solid fa-list-ul" />
        {{ playlist.name }}
      </NuxtLink>
    </li>
  </div>
</template>

<style scoped>
.svg-inline--fa {
  @apply w-[14px];
}
</style>
