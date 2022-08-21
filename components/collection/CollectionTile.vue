<script setup lang="ts">
const _props = defineProps<{
  type: "album" | "show";
  collection: SpotifyApi.AlbumObjectFull | SpotifyApi.ShowObjectSimplified;
}>();

type Props<T, U> = {
  type: T;
  collection: U;
};
type AlbumProps = Props<"album", SpotifyApi.AlbumObjectFull>;
type ShowProps = Props<"show", SpotifyApi.ShowObjectSimplified>;

const props = _props as Readonly<AlbumProps | ShowProps>;

const { spotifyApi } = useSpotifyApi();

const author = computed(() => {
  switch (props.type) {
    case "album":
      return props.collection.artists.map((a) => a.name).join(", ");
    case "show":
      return props.collection.publisher;
  }
});
</script>

<template>
  <div>
    <NuxtLink :to="`/${type}/${collection.id}`" class="group relative block">
      <img
        :src="collection.images[0]?.url"
        class="rounded drop-shadow group-hover:brightness-75"
      />
      <div
        class="hidden group-hover:flex absolute bottom-0 w-full p-4 justify-between"
      >
        <button
          @click.prevent="spotifyApi.play({ context_uri: collection.uri })"
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
      <NuxtLink :to="`/${type}/${collection.id}`" class="font-semibold">
        {{ collection.name }}
      </NuxtLink>
      <span>{{ author }}</span>
    </div>
  </div>
</template>
