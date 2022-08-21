<script setup lang="ts">
useHead({
  link: [{ rel: "manifest", href: "/manifest.json" }]
});

const { connected } = useSpotifyApi();
</script>

<template>
  <div class="w-screen h-screen drawer drawer-mobile">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col md:flex-col-reverse">
      <div class="flex-1 flex flex-col overflow-y-scroll">
        <main class="flex-1 m-4 md:m-10">
          <NuxtPage />
        </main>

        <label
          for="app-drawer"
          class="lg:hidden w-fit sticky bottom-2 left-2 btn btn-secondary opacity-80 drawer-button z-50"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </label>
      </div>

      <div
        class="sticky flex items-center justify-center border-t md:border-t-0 md:border-b border-base-200 shadow-sm"
      >
        <div class="flex-1 p-1 px-2">
          <Player v-if="connected" />
          <Login v-else />
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="app-drawer" class="drawer-overlay" />
      <Header class="w-60 border-r border-base-300 bg-neutral" />
    </div>
  </div>
</template>
