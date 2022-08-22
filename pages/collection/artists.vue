<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();

const artists = ref<SpotifyApi.ArtistObjectFull[]>([]);
const resp = await spotifyApi.value.getFollowedArtists();
artists.value = resp.artists.items;

const selected = ref<SpotifyApi.ArtistObjectFull>();

const {
  pending,
  data: albums,
  refresh
} = useLazyAsyncData(() => spotifyApi.value.getArtistAlbums(selected.value.id));
watch(
  () => selected.value?.id,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="h-full drawer drawer-mobile">
    <input
      id="collection-artists-drawer"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-content">
      <header
        class="sticky top-0 p-4 sm:p-8 pb-0 sm:pb-0 flex gap-x-4 bg-base-100 z-10"
      >
        <label
          for="collection-artists-drawer"
          class="btn btn-sm text-primary drawer-button lg:hidden"
        >
          <font-awesome-icon icon="fa-solid fa-angles-right" />
        </label>

        <div class="flex-1 flex flex-col">
          <div class="flex justify-between">
            <h1 class="font-bold text-2xl">{{ selected?.name }}</h1>

            <div class="space-x-1">
              <button class="btn btn-sm btn-circle">
                <font-awesome-icon
                  icon="fa-solid fa-play"
                  class="text-primary"
                />
              </button>
              <button class="btn btn-sm btn-circle">
                <font-awesome-icon
                  icon="fa-solid fa-shuffle"
                  class="text-primary"
                />
              </button>
              <button class="btn btn-sm btn-circle">
                <font-awesome-icon
                  icon="fa-solid fa-ellipsis"
                  class="text-primary"
                />
              </button>
            </div>
          </div>

          <div class="divider m-1" />
        </div>
      </header>

      <main class="m-4 sm:m-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <template v-if="selected && !pending">
          <CollectionTile
            v-for="album in albums.items"
            :key="album.id"
            type="album"
            :collection="album"
          />
        </template>
      </main>
    </div>

    <div class="drawer-side">
      <label for="collection-artists-drawer" class="drawer-overlay" />
      <ul class="menu w-80 border-r divide-y bg-base-100">
        <li v-for="artist in artists" :key="artist.id">
          <a
            @click="selected = artist"
            class="grid grid-cols-[1fr_6fr]"
            :class="{ active: artist.id === selected?.id }"
          >
            <div class="avatar block">
              <div class="rounded-full border">
                <img :src="artist.images[0].url" />
              </div>
            </div>
            <p>{{ artist.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
