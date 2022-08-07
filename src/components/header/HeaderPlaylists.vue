<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListUl, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SpotifyWebApi from "spotify-web-api-js";
import { ref } from "vue";

library.add(faTableCells, faListUl);

const props = defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();

const resp = await props.spotifyApi.getUserPlaylists();
const playlists = ref(resp.items);
console.log(playlists.value);
</script>

<template>
  <ul class="menu menu-compact p-2">
    <li class="menu-title">
      <span>Playlists</span>
    </li>
    <li>
      <a>
        <FontAwesomeIcon icon="fa-solid fa-table-cells" />
        All Playlists
      </a>
    </li>
    <li v-for="playlist in playlists" :key="playlist.id">
      <a @click="spotifyApi.play({ context_uri: playlist.uri })">
        <FontAwesomeIcon icon="fa-solid fa-list-ul" />
        {{ playlist.name }}
      </a>
    </li>
  </ul>
</template>
