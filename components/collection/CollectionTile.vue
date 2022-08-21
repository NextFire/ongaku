<script setup lang="ts">
type GenericCollecProps<T extends { type: string }> = {
  type: T["type"];
  collection: T;
};

type AlbumProps = GenericCollecProps<SpotifyApi.AlbumObjectFull>;
type ShowProps = GenericCollecProps<SpotifyApi.ShowObjectSimplified>;
type PlaylistProps = GenericCollecProps<SpotifyApi.PlaylistObjectSimplified>;

type Props = Readonly<AlbumProps | ShowProps | PlaylistProps>;

const _props = defineProps<{
  type: Props["type"];
  collection: Props["collection"];
}>();

const props = _props as Props;

const { spotifyApi } = useSpotifyApi();

const author = computed(() => {
  switch (props.type) {
    case "album":
      return props.collection.artists.map((a) => a.name).join(", ");
    case "show":
      return props.collection.publisher;
    case "playlist":
      return props.collection.owner.display_name;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="`/${type}/${collection.id}`"
      class="flex-1 group relative block"
    >
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
