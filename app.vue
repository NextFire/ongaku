<script setup lang="ts">
const { connected } = useSpotifyApi();
</script>

<template>
  <div class="w-screen h-screen drawer drawer-mobile">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col md:flex-col-reverse">
      <Main class="-z-10">
        <NuxtPage />
      </Main>
      <div
        class="sticky w-full flex items-center justify-center bg-primary-content border-t md:border-t-0 md:border-b border-base-200 shadow-sm"
      >
        <label
          for="app-drawer"
          class="mx-2 btn btn-sm btn-ghost drawer-button lg:hidden"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </label>
        <div class="flex-1 p-1">
          <Player v-if="connected" />
          <Login v-else />
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="app-drawer" class="drawer-overlay" />
      <Header class="w-60 border-r border-base-300 bg-base-200" />
    </div>
  </div>
</template>
