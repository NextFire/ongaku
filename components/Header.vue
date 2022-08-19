<script setup lang="ts">
const { connected } = useSpotifyApi();
</script>

<template>
  <header>
    <nav>
      <div v-if="connected">
        <HeaderLibrary />
        <HeaderPlaylists />
      </div>
    </nav>
  </header>
</template>
