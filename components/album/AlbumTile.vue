<script setup lang="ts">
defineProps<{ album: SpotifyApi.AlbumObjectFull }>();
const { spotifyApi } = useSpotifyApi();
</script>

<template>
  <div>
    <NuxtLink :to="`/album/${album.id}`" class="relative group">
      <img
        :src="album.images[0].url"
        class="rounded drop-shadow-sm group-hover:brightness-75"
      />
      <div
        class="hidden group-hover:flex absolute bottom-0 w-full p-4 justify-between"
      >
        <button
          @click.prevent="spotifyApi.play({ context_uri: album.uri })"
          class="btn btn-secondary hover:btn-primary btn-circle btn-sm opacity-75 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-play" />
        </button>
        <button
          class="btn btn-secondary hover:btn-primary btn-circle btn-sm opacity-75 hover:opacity-100"
        >
          <font-awesome-icon icon="fa-solid fa-ellipsis" />
        </button>
      </div>
    </NuxtLink>
    <div class="h-10 mt-1 flex flex-col text-xs">
      <NuxtLink :to="`/album/${album.id}`" class="font-semibold">
        {{ album.name }}
      </NuxtLink>
      <span>{{ album.artists.map((a) => a.name).join(", ") }}</span>
    </div>
  </div>
</template>
