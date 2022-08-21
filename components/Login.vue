<script setup lang="ts">
const save = useLocalStorage("hrefPreLogin", undefined);

function saveHref() {
  save.value = window.location.href;
}
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <a class="btn btn-primary" href="/api/login" @click="saveHref()">
      Login with Spotify
    </a>
  </div>
</template>
