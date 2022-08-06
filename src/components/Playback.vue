<script setup lang="ts">
import { ref } from "vue";
import { usePlaybackSdk } from "../composables/playback-sdk";

const token = ref("");

const { ready } = usePlaybackSdk();

const load = async () => {
  await ready;
  const player = new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: (cb) => {
      cb(token.value);
    },
  });
  player.connect();
};
</script>

<template>
  <form @submit.prevent="load">
    <label>
      token
      <input v-model="token" />
    </label>
    <input type="submit" />
  </form>
</template>
