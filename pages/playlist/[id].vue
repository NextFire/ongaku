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
    <CollectionHeader type="playlist" :collection="playlist" />

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
