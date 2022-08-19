const { spotifyApi } = useSpotifyApi();

const state = ref<SpotifyApi.CurrentPlaybackResponse>();

const timer = ref<NodeJS.Timer>();
watchEffect(async () => {
  clearInterval(timer.value);
  timer.value = setInterval(async () => {
    const data = await spotifyApi.value.getMyCurrentPlaybackState();
    console.log("state", data);
    state.value = data;
  }, 1000);
});

export const useSpotifyState = async () => {
  if (!state.value) {
    state.value = await spotifyApi.value.getMyCurrentPlaybackState();
  }
  return state;
};
