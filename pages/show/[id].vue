<script setup lang="ts">
import { millisToMinutesAndSeconds } from "~~/lib/utils";

const route = useRoute();
const { spotifyApi } = useSpotifyApi();

const show = ref(await spotifyApi.value.getShow(route.params.id as string));

async function play(uri?: string) {
  spotifyApi.value.play({
    context_uri: show.value.uri,
    offset: uri ? { uri } : undefined
  });
}
</script>

<template>
  <div class="flex flex-col gap-y-8 items-center">
    <CollectionHeader type="show" :collection="show" :play="() => play()" />

    <table class="table table-zebra table-fixed w-full">
      <tbody>
        <tr
          v-for="
          // @ts-expect-error: wrong type definition
          episode in show.episodes.items as SpotifyApi.EpisodeObjectSimplified[]
          "
          :key="episode.id"
          class="hover flex group"
        >
          <th @click="play(episode.uri)">
            <font-awesome-icon
              icon="fa-solid fa-play"
              class="text-transparent group-hover:text-primary"
            />
          </th>
          <td class="flex-1 whitespace-normal">
            <h4 class="text-secondary">{{ episode.release_date }}</h4>
            <h3 class="font-semibold">{{ episode.name }}</h3>
            <p>{{ episode.description }}</p>
          </td>
          <td>
            <font-awesome-icon
              icon="fa-solid fa-plus"
              class="text-transparent group-hover:text-primary"
            />
          </td>
          <td>{{ millisToMinutesAndSeconds(episode.duration_ms) }}</td>
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
