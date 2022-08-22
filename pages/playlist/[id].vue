<script setup lang="ts">
import { millisToMinutesAndSeconds } from "~~/lib/utils";

const route = useRoute();
const { spotifyApi } = useSpotifyApi();

const resp = await spotifyApi.value.getPlaylist(route.params.id as string);
const playlist = ref(resp);

async function play(uri?: string) {
  spotifyApi.value.play({
    context_uri: playlist.value.uri,
    offset: uri ? { uri } : undefined
  });
}

watch(
  () => route.params.id,
  async (newId) => {
    const resp = await spotifyApi.value.getPlaylist(newId as string);
    playlist.value = resp;
  }
);
</script>

<template>
  <div class="m-4 md:m-8 flex flex-col gap-y-8 items-center">
    <CollectionHeader
      type="playlist"
      :collection="playlist"
      :play="() => play()"
    />

    <table class="table table-zebra table-fixed w-full">
      <thead>
        <tr>
          <th class="w-16"></th>
          <th>Song</th>
          <th>Artist</th>
          <th>Album</th>
          <th class="w-16">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(song, index) in playlist.tracks.items"
          :key="index"
          class="h-16 hover group"
        >
          <template v-if="song.track.type === 'track'">
            <td>
              <div @click="play(song.track.uri)" class="relative">
                <img
                  :src="song.track.album.images[0]?.url"
                  class="rounded group-hover:brightness-75"
                />
                <div
                  class="absolute bottom-0 w-full h-full hidden group-hover:flex justify-center items-center"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-play"
                    class="w-2 text-neutral"
                  />
                </div>
              </div>
            </td>
            <td class="truncate">
              {{ song.track.name }}
            </td>
            <td class="truncate">
              {{ song.track.artists.map((a) => a.name).join(", ") }}
            </td>
            <td class="truncate">
              <NuxtLink :to="`/album/${song.track.album.id}`">
                {{ song.track.album.name }}
              </NuxtLink>
            </td>
            <td>
              {{ millisToMinutesAndSeconds(song.track.duration_ms) }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
