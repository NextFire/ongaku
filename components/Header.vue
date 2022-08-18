<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

defineProps<{
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  connected: boolean;
}>();
</script>

<template>
  <header>
    <nav>
      <div v-if="connected">
        <HeaderLibrary :spotify-api="spotifyApi" />
        <Suspense>
          <HeaderPlaylists :spotify-api="spotifyApi" />
        </Suspense>
      </div>
    </nav>
  </header>
</template>
