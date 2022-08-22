<script setup lang="ts">
export type CollecProps<T extends { type: string }> = {
  type: T["type"];
  collection: T;
};

export type AlbumProps = CollecProps<SpotifyApi.AlbumObjectFull>;
export type ShowProps = CollecProps<SpotifyApi.ShowObjectFull>;
export type PlaylistProps = CollecProps<SpotifyApi.PlaylistObjectFull>;

export type PropsType = Readonly<AlbumProps | ShowProps | PlaylistProps>;

export interface Props {
  type: PropsType["type"];
  collection: PropsType["collection"];
  play: () => void;
}

const _props = defineProps<Props>();
const props = _props as PropsType;

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

const infos = computed(() => {
  switch (props.type) {
    case "album":
      return props.collection.release_date.split("-")[0];
    case "show":
      // @ts-expect-error: wrong type definition
      return props.collection.episodes.total + " episodes";
    case "playlist":
      return props.collection.tracks.total + " tracks";
  }
});

const description = computed(() => {
  switch (props.type) {
    case "show":
    case "playlist":
      return props.collection.description;
  }
});
</script>

<template>
  <header
    class="w-3/4 sm:w-full flex flex-col items-center sm:grid grid-rows-1 grid-cols-[1fr_3fr] gap-4 sm:gap-8"
  >
    <img
      :src="collection.images[0]?.url"
      class="w-2/3 sm:w-full rounded-lg shadow"
    />

    <div class="w-full h-full flex flex-col justify-end gap-y-4 sm:gap-0">
      <div class="text-center sm:text-left flex-1 flex flex-col justify-center">
        <h1 class="font-bold text-2xl">
          {{ collection.name }}
        </h1>
        <h2 class="text-2xl text-primary">
          {{ author }}
        </h2>
        <h3 class="text-sm uppercase text-secondary">
          {{ infos }}
        </h3>
        <p>
          {{ description }}
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
            <font-awesome-icon icon="fa-solid fa-plus" class="text-primary" />
          </button>
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
</template>
