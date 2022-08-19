<script setup lang="ts">
const { spotifyApi } = useSpotifyApi();
const state = await useSpotifyState();

const isPlaying = ref(state.value.is_playing);
const shuffleState = ref(state.value.shuffle_state);
const repeatState = ref(state.value.repeat_state);

const NEXT_REPEAT_STATE: {
  [key: SpotifyApi.PlaybackRepeatState]: SpotifyApi.PlaybackRepeatState;
} = {
  off: "context",
  context: "track",
  track: "off"
};

watch(
  () => state.value.is_playing,
  (v) => {
    isPlaying.value = v;
  }
);
watch(isPlaying, (isPlaying) => {
  spotifyApi.value[isPlaying ? "play" : "pause"]();
});

watch(
  () => state.value.shuffle_state,
  (v) => {
    shuffleState.value = v;
  }
);
watch(shuffleState, (shuffleState) => {
  spotifyApi.value.setShuffle(shuffleState);
});

watch(
  () => state.value.repeat_state,
  (v) => {
    repeatState.value = v;
  }
);
watch(repeatState, (repeatState) => {
  spotifyApi.value.setRepeat(repeatState);
});

async function onBackward() {
  if (state.value.progress_ms <= 3000) {
    spotifyApi.value.skipToPrevious();
  } else {
    spotifyApi.value.seek(0);
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button
      @click="shuffleState = !shuffleState"
      class="btn btn-sm"
      :class="{ 'btn-ghost': !shuffleState }"
    >
      <font-awesome-icon icon="fa-solid fa-shuffle" />
    </button>
    <button @click="onBackward" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-backward" class="fa-lg" />
    </button>
    <button @click="isPlaying = !isPlaying" class="btn btn-sm btn-ghost">
      <font-awesome-icon
        :icon="['fa-solid', isPlaying ? 'fa-pause' : 'fa-play']"
        class="fa-2x"
      />
    </button>
    <button @click="spotifyApi.skipToNext()" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-forward" class="fa-lg" />
    </button>
    <button
      @click="repeatState = NEXT_REPEAT_STATE[repeatState]"
      class="btn btn-sm space-x-1"
      :class="{
        'btn-ghost': repeatState === 'off',
        'btn-secondary': repeatState === 'track'
      }"
    >
      <font-awesome-icon icon="fa-solid fa-repeat" />
      <span v-if="repeatState === 'track'">1</span>
    </button>
  </div>
</template>
