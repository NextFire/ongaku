<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClock,
  faMicrophone,
  faMusic,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SpotifyWebApi from "spotify-web-api-js";

library.add(faClock, faMicrophone, faRecordVinyl, faMusic);

defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>
  <ul class="menu menu-compact p-2">
    <li class="menu-title">
      <span>Library</span>
    </li>
    <li>
      <a>
        <FontAwesomeIcon icon="fa-solid fa-clock" />
        Recently Added
      </a>
    </li>
    <li>
      <a>
        <FontAwesomeIcon icon="fa-solid fa-microphone" />
        Artists
      </a>
    </li>
    <li>
      <a>
        <FontAwesomeIcon icon="fa-solid fa-record-vinyl" />
        Albums
      </a>
    </li>
    <li>
      <a>
        <FontAwesomeIcon icon="fa-solid fa-music" />
        Songs
      </a>
    </li>
  </ul>
</template>
