<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

defineProps<{ spotifyApi: SpotifyWebApi.SpotifyWebApiJs }>();
</script>

<template>Playlist {{ $route.params.uri }}</template>
