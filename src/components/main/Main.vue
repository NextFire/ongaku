<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const props = defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <main>
    <suspense>
      <router-view :spotify-api="spotifyApi" class="m-10" />
    </suspense>
  </main>
</template>
