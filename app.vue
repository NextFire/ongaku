<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const { accessToken } = useAccessToken();

const spotifyApi = ref(new SpotifyWebApi());
watchEffect(() => {
  const api = new SpotifyWebApi();
  api.setAccessToken(accessToken.value);
  spotifyApi.value = api;
});
</script>

<template>
  <NuxtLayout :spotify-api="spotifyApi">
    <Main>
      <NuxtPage :spotify-api="spotifyApi" class="m-10" />
    </Main>
  </NuxtLayout>
</template>

<style>
#__nuxt {
  @apply h-screen w-screen;
}
</style>
