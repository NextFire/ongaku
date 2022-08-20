<script setup lang="ts">
const route = useRoute();
const { spotifyApi } = useSpotifyApi();

const resp = await spotifyApi.value.getPlaylist(route.params.id as string);
const playlist = ref(resp);

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

async function play(uri?: string) {
  spotifyApi.value.play({
    context_uri: playlist.value.uri,
    offset: { uri }
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
  <div class="flex flex-col gap-y-10">
    <header class="grid md:grid-cols-[270px_auto] md:gap-x-10">
      <img :src="playlist.images[0]?.url" class="rounded-lg" />
      <div class="pt-4 md:pt-20 flex flex-col gap-1">
        <h1 class="font-bold text-2xl">{{ playlist.name }}</h1>
        <h2 class="uppercase">{{ playlist.tracks.total }} tracks</h2>
        <p class="grow">{{ playlist.description }}</p>
        <div class="flex gap-5">
          <button @click="play()" class="btn btn-sm btn-primary space-x-2 w-40">
            <font-awesome-icon icon="fa-solid fa-play" />
            <span>Play</span>
          </button>
          <button @click="play()" class="btn btn-sm btn-primary space-x-2 w-40">
            <font-awesome-icon icon="fa-solid fa-shuffle" />
            <span>Shuffle</span>
          </button>
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
            {{(song.track as SpotifyApi.TrackObjectFull).name}}
          </td>
          <td class="truncate">
            {{(song.track as SpotifyApi.TrackObjectFull).artists.map(a => a.name).join(', ')}}
          </td>
          <td class="truncate">
            {{(song.track as SpotifyApi.TrackObjectFull).album.name}}
          </td>
          <td>
            {{millisToMinutesAndSeconds((song.track as SpotifyApi.TrackObjectFull).duration_ms)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
