<script setup lang="ts">
useHead({
  link: [{ rel: "manifest", href: "/manifest.json" }]
});
const { connected } = useSpotifyApi();
</script>

<template>
  <div class="drawer max-h-screen drawer-mobile">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col md:flex-col-reverse">
      <main class="flex-1 overflow-scroll relative">
        <NuxtPage />

        <label
          for="app-drawer"
          class="lg:hidden w-fit sticky bottom-2 left-2 btn btn-secondary opacity-80 drawer-button z-50"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </label>
      </main>

      <div
        class="p-1 px-2 border-t md:border-t-0 md:border-b border-base-200 shadow-sm"
      >
        <Player v-if="connected" />
        <Login v-else />
      </div>
    </div>

    <div class="drawer-side">
      <label for="app-drawer" class="drawer-overlay" />
      <Header class="w-60 border-r border-base-300 bg-neutral" />
    </div>
  </div>
</template>
