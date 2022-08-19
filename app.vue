<script setup lang="ts">
const { connected } = useToken();
</script>

<template>
  <div
    class="h-screen w-screen grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  >
    <Header
      class="row-span-2 w-[250px] border-r border-base-300 bg-base-200 overflow-y-scroll"
    />

    <div class="h-[60px] border-b border-base-200 shadow-sm">
      <Player v-if="connected" class="h-full" />
      <Login v-else />
    </div>

    <Main>
      <NuxtPage />
    </Main>
  </div>
</template>
