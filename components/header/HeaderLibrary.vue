<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <ul class="menu menu-compact p-2">
    <li class="menu-title">
      <span>Library</span>
    </li>
    <li>
      <a>
        <font-awesome-icon icon="fa-solid fa-clock" />
        Recently Added
      </a>
    </li>
    <li>
      <a>
        <font-awesome-icon icon="fa-solid fa-microphone" />
        Artists
      </a>
    </li>
    <li>
      <a>
        <font-awesome-icon icon="fa-solid fa-record-vinyl" />
        Albums
      </a>
    </li>
    <li>
      <a>
        <font-awesome-icon icon="fa-solid fa-music" />
        Songs
      </a>
    </li>
  </ul>
</template>
