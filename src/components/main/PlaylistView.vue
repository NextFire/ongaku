<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();

const route = useRoute();

const resp = await props.spotifyApi.getPlaylist(route.params.id as string);
const playlist = ref(resp);

async function play() {
  props.spotifyApi.play({ context_uri: playlist.value.uri });
}

watch(
  () => route.params.id,
  async (newId) => {
    const resp = await props.spotifyApi.getPlaylist(newId as string);
    playlist.value = resp;
  }
);
</script>

<template>
  <div>
    <header>
      <img :src="playlist.images[0].url" class="w-1/4" />
      <div>
        <h1>{{ playlist.name }}</h1>
        <h2 class="uppercase">{{ playlist.tracks.total }} tracks</h2>
        <p>{{ playlist.description }}</p>
        <button @click="play()" class="btn space-x-2">
          <font-awesome-icon icon="fa-solid fa-play" />
          <span>Play</span>
        </button>
      </div>
    </header>
  </div>
</template>
