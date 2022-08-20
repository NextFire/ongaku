<script setup lang="ts">
import { millisToMinutesAndSeconds } from "~~/lib/utils";

const route = useRoute();
const { spotifyApi } = useSpotifyApi();

const album = ref(await spotifyApi.value.getAlbum(route.params.id as string));

async function play(uri?: string) {
  spotifyApi.value.play({
    context_uri: album.value.uri,
    offset: uri ? { uri } : undefined
  });
}
</script>

<template>
  <div class="flex flex-col gap-y-8 items-center">
    <header
      class="w-3/4 sm:w-full flex items-center flex-col sm:grid grid-cols-[1fr_3fr] gap-4 sm:gap-8"
    >
      <img
        :src="album.images[0].url"
        class="w-2/3 sm:w-full rounded-lg shadow"
      />

      <div class="w-full h-full flex flex-col justify-end gap-y-4 sm:gap-0">
        <div
          class="text-center sm:text-left flex-1 flex flex-col justify-center"
        >
          <h1 class="font-bold text-2xl">{{ album.name }}</h1>
          <h2 class="text-2xl text-primary">
            {{ album.artists.map((a) => a.name).join(", ") }}
          </h2>
          <span class="text-sm uppercase">
            {{ album.release_date.split("-")[0] }}
          </span>
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
            <button class="btn btn-sm rounded-full space-x-2">
              <font-awesome-icon icon="fa-solid fa-plus" />
              <span>Add</span>
            </button>
            <button class="btn btn-sm btn-circle space-x-2">
              <font-awesome-icon icon="fa-solid fa-ellipsis" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <table class="table table-zebra table-fixed w-full">
      <tbody>
        <tr
          v-for="track in album.tracks.items"
          :key="track.id"
          class="hover flex group"
        >
          <th @click="play(track.uri)" class="w-10">
            <span class="text-secondary group-hover:hidden">
              {{ track.track_number }}
            </span>
            <span class="text-primary hidden group-hover:inline">
              <font-awesome-icon icon="fa-solid fa-play" />
            </span>
          </th>
          <td class="flex-1 truncate">{{ track.name }}</td>
          <td class="hidden group-hover:block">
            <font-awesome-icon icon="fa-solid fa-plus" class="text-primary" />
          </td>
          <td>{{ millisToMinutesAndSeconds(track.duration_ms) }}</td>
          <td>
            <font-awesome-icon
              icon="fa-solid fa-ellipsis"
              class="text-primary"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
