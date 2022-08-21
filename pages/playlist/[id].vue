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
  <div class="flex flex-col gap-y-8 items-center">
    <header
      class="w-3/4 sm:w-full flex flex-col items-center sm:grid grid-rows-1 grid-cols-[1fr_3fr] gap-4 sm:gap-8"
    >
      <img
        :src="playlist.images[0]?.url"
        class="w-2/3 sm:w-full rounded-lg shadow"
      />

      <div class="w-full h-full flex flex-col justify-end gap-y-4 sm:gap-0">
        <div
          class="text-center sm:text-left flex-1 flex flex-col justify-center"
        >
          <h1 class="font-bold text-2xl">{{ playlist.name }}</h1>
          <span class="text-sm uppercase text-secondary">
            {{ playlist.tracks.total }} tracks
          </span>
          <p>
            {{ playlist.description }}
          </p>
        </div>

        <div class="flex justify-between">
          <div class="grid sm:grid-cols-2 gap-x-4">
            <button @click="play()" class="btn btn-sm btn-primary space-x-2">
              <font-awesome-icon icon="fa-solid fa-play" />
              <span>Play</span>
            </button>
            <button class="hidden sm:block btn btn-sm btn-primary space-x-2">
              <font-awesome-icon icon="fa-solid fa-shuffle" />
              <span>Shuffle</span>
            </button>
          </div>
          <div class="flex gap-x-4">
            <button class="btn btn-sm btn-circle space-x-2">
              <font-awesome-icon
                icon="fa-solid fa-ellipsis"
                class="text-primary"
              />
            </button>
          </div>
        </div>
      </div>
    </header>

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
          @click="play(song.track.uri)"
          :key="index"
          class="h-16 hover cursor-pointer"
        >
          <td>
            <img
              :src="(song.track as SpotifyApi.TrackObjectFull).album.images[0]?.url"
            />
          </td>
          <td class="truncate">
            {{ (song.track as SpotifyApi.TrackObjectFull).name }}
          </td>
          <td class="truncate">
            {{
              (song.track as SpotifyApi.TrackObjectFull).artists
                .map((a) => a.name)
                .join(", ")
            }}
          </td>
          <td class="truncate">
            {{ (song.track as SpotifyApi.TrackObjectFull).album.name }}
          </td>
          <td>
            {{
              millisToMinutesAndSeconds(
                (song.track as SpotifyApi.TrackObjectFull).duration_ms
              )
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
