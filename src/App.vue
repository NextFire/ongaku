<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Login from "./components/Login.vue";
import Playback from "./components/Playback.vue";
import { useParamsTokens } from "./composables/params-tokens";

const { spotifyTokens } = useParamsTokens();
</script>

<template>
  <Login v-if="!spotifyTokens?.accessToken" />
  <template v-else>
    <Playback :accessToken="spotifyTokens.accessToken" />
  </template>
</template>
