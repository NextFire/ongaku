<script setup lang="ts">
export type CollecProps<T extends { type: string }> = {
  type: T["type"];
  collection: T;
};

export type AlbumProps = CollecProps<SpotifyApi.AlbumObjectFull>;
export type ShowProps = CollecProps<SpotifyApi.ShowObjectSimplified>;
export type PlaylistProps = CollecProps<SpotifyApi.PlaylistObjectSimplified>;

export type PropsType = Readonly<AlbumProps | ShowProps | PlaylistProps>;

export interface Props {
  type: PropsType["type"];
  collection: PropsType["collection"];
}

const _props = defineProps<Props>();
const props = _props as PropsType;

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
