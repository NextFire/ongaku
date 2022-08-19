const { spotifyApi, connected } = useSpotifyApi();

const state = ref<SpotifyApi.CurrentPlaybackResponse>();

const timer = ref<NodeJS.Timer>();
watchEffect(async () => {
  if (connected.value) {
    clearInterval(timer.value);
    timer.value = setInterval(async () => {
      const data = await spotifyApi.value.getMyCurrentPlaybackState();
      state.value = data;
    }, 1000);
  }
});

export const useSpotifyState = async () => {
  if (!state.value) {
    state.value = await spotifyApi.value.getMyCurrentPlaybackState();
  }
  return state;
};
