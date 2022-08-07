<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const props = defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <main>
    <router-view :spotify-api="spotifyApi" />
  </main>
</template>
