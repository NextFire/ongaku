<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <main>
    <suspense>
      <NuxtPage :spotify-api="spotifyApi" class="m-10" />
    </suspense>
  </main>
</template>
