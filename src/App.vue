<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import Player from "./components/Player.vue";
import { useParamsTokens } from "./composables/auth";

const { spotifyTokens } = useParamsTokens();
</script>

<template>
  <Login v-if="!spotifyTokens?.accessToken" />
  <template v-else>
    <div
      class="h-full grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
    >
      <Header
        class="row-span-2 w-[250px] border-r border-base-300 bg-base-200"
      />
      <Suspense>
        <Player
          :accessToken="spotifyTokens.accessToken"
          class="h-[60px] border-b border-base-200 shadow-sm"
        />
      </Suspense>
      <Main class="overflow-y-scroll" />
    </div>
  </template>
</template>
