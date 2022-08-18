<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const props = defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
}>();

const connected = computed(
  () => props.spotifyApi.getAccessToken() !== undefined
);
</script>

<template>
  <header>
    <nav>
      <div v-if="connected">
        <HeaderLibrary :spotify-api="spotifyApi" />
        <HeaderPlaylists :spotify-api="spotifyApi" />
      </div>
    </nav>
  </header>
</template>
