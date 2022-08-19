<script setup lang="ts">
const { connected } = useSpotifyApi();
</script>

<template>
  <header>
    <nav>
      <HeaderSearch class="m-6 mb-3" />
      <ul class="menu menu-compact p-3 gap-y-3">
        <HeaderSpotify />
        <HeaderLibrary v-if="connected" />
        <HeaderPlaylists v-if="connected" />
      </ul>
    </nav>
  </header>
</template>
