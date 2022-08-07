<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import SpotifyWebApi from "spotify-web-api-js";
import { ref } from "vue";
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import Player from "./components/player/Player.vue";
import { useParamsTokens } from "./composables/auth";

const { spotifyTokens } = useParamsTokens();

const spotifyApi = ref(new SpotifyWebApi());
spotifyApi.value.setAccessToken(spotifyTokens.value?.accessToken ?? null);
</script>

<template>
  <Login v-if="!spotifyTokens?.accessToken" />
  <template v-else>
    <div
      class="h-full grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
    >
      <Header
        :spotify-api="spotifyApi"
        class="row-span-2 w-[250px] border-r border-base-300 bg-base-200"
      />
      <Suspense>
        <Player
          :spotify-api="spotifyApi"
          :access-token="spotifyTokens.accessToken"
          class="h-[60px] border-b border-base-200 shadow-sm"
        />
      </Suspense>
      <Main :spotify-api="spotifyApi" class="overflow-y-scroll" />
    </div>
  </template>
</template>
