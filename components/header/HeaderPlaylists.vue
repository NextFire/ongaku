<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const resp = await spotifyApi.value.getUserPlaylists();
const playlists = ref(resp.items);
</script>

<template>
  <ul class="menu menu-compact p-2">
    <li class="menu-title">
      <span>Playlists</span>
    </li>
    <li>
      <a>
        <font-awesome-icon icon="fa-solid fa-table-cells" />
        All Playlists
      </a>
    </li>
    <li v-for="playlist in playlists" :key="playlist.id">
      <router-link
        :to="`/playlists/${playlist.id}`"
        :class="{
          active: $route.name === 'playlist' && $route.params.id === playlist.id
        }"
      >
        <font-awesome-icon icon="fa-solid fa-list-ul" />
        {{ playlist.name }}
      </router-link>
    </li>
  </ul>
</template>
