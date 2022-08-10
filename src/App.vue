<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import SpotifyWebApi from "spotify-web-api-js";
import { computed, ref, watchEffect } from "vue";
import Header from "./components/header/Header.vue";
import Login from "./components/Login.vue";
import Main from "./components/main/Main.vue";
import Player from "./components/player/Player.vue";
import { useParamsTokens } from "./composables/auth";

const { spotifyTokens, refreshAccessToken } = useParamsTokens();

const spotifyApi = ref(new SpotifyWebApi());
watchEffect(() => {
  spotifyApi.value.setAccessToken(spotifyTokens.value?.access_token ?? null);
});

const connected = computed(
  () => spotifyTokens.value?.access_token !== undefined
);
</script>

<template>
  <div
    class="h-full grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  >
    <Header
      :spotify-api="spotifyApi"
      :connected="connected"
      class="row-span-2 w-[250px] border-r border-base-300 bg-base-200 overflow-y-scroll"
    />

    <div class="h-[60px] border-b border-base-200 shadow-sm">
      <Suspense v-if="connected">
        <Player
          :spotify-api="spotifyApi"
          :refresh-access-token="refreshAccessToken"
          class="h-full"
        />
      </Suspense>
      <Login v-else />
    </div>

    <Main :spotify-api="spotifyApi" class="overflow-y-scroll" />
  </div>
</template>
