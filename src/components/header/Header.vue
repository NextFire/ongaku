<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";
import HeaderPlaylists from "./HeaderPlaylists.vue";
import HeaderLibrary from "./HeaderLibrary.vue";

defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <header>
    <nav>
      <HeaderLibrary :spotify-api="spotifyApi" />
      <Suspense>
        <HeaderPlaylists :spotify-api="spotifyApi" />
      </Suspense>
    </nav>
  </header>
</template>
