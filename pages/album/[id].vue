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
    <CollectionHeader type="album" :collection="album" />

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
