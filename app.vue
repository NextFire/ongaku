<script setup lang="ts">
import SpotifyWebApi from "spotify-web-api-js";

const { spotifyTokens, refreshAccessToken } = useParamsTokens();

const spotifyApi = ref(new SpotifyWebApi());
watchEffect(() => {
  spotifyApi.value.setAccessToken(spotifyTokens.value?.access_token ?? null);
});

const connected = computed(
  () => spotifyTokens.value?.access_token !== undefined
);
</script>

<template>
  <div
    class="h-full grid grid-flow-col grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  >
    <Header
      :spotify-api="spotifyApi"
      :connected="connected"
      class="row-span-2 w-[250px] border-r border-base-300 bg-base-200 overflow-y-scroll"
    />

    <div class="h-[60px] border-b border-base-200 shadow-sm">
      <Suspense v-if="connected">
        <Player
          :spotify-api="spotifyApi"
          :refresh-access-token="refreshAccessToken"
          class="h-full"
        />
      </Suspense>
      <Login v-else />
    </div>

    <Main :spotify-api="spotifyApi" class="overflow-y-scroll" />
  </div>
</template>

<style>
#__nuxt {
  @apply h-screen w-screen;
}

.slider[type="range"] {
  display: block;
  height: 100%;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  --playerScrubberFill: rgba(0, 0, 0, 0.5);
  --playerScrubberTrack: rgba(0, 0, 0, 0.1);
  @apply dark:[--playerScrubberFill:rgba(255,_255,_255,_0.6)] dark:[--playerScrubberTrack:rgba(255,_255,_255,_0.1)];
}

.slider[type="range"]::-ms-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}

.slider[type="range"]::-webkit-slider-runnable-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}
</style>
