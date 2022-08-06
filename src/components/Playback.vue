<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { usePlaybackSdk } from "../composables/playback-sdk";

const props = defineProps<{ accessToken: string }>();

const spotifyPlayer = ref<Spotify.Player>();

const isPaused = ref(false);
const isActive = ref(false);
const currentTrack = ref({
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
});

const { ready } = usePlaybackSdk();

onMounted(async () => {
  await ready;
  const player = new Spotify.Player({
    name: "Ongaku",
    getOAuthToken: (cb) => {
      cb(props.accessToken);
    },
    volume: 0.1,
  });
  spotifyPlayer.value = player;
  player.connect();
});

watch(spotifyPlayer, (player) => {
  if (player) {
    player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      currentTrack.value = state.track_window.current_track;
      isPaused.value = state.paused;

      player.getCurrentState().then((state) => {
        !state ? (isActive.value = false) : (isActive.value = true);
      });
    });
  }
});
</script>

<template>
  <div class="App">
    <header class="App-header">
      <template v-if="!isActive">
        <div class="container">
          <div class="main-wrapper">
            <b>
              Instance not active. Transfer your playback using your Spotify app
            </b>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="container">
          <div class="main-wrapper">
            <img
              :src="currentTrack.album.images[0].url"
              class="now-playing__cover"
              alt=""
            />

            <div class="now-playing__side">
              <div class="now-playing__name">{{ currentTrack.name }}</div>

              <div class="now-playing__artist">
                {{ currentTrack.artists[0].name }}
              </div>
            </div>
          </div>
        </div>

        <button
          class="btn-spotify"
          @click="
            () => {
              spotifyPlayer?.previousTrack();
            }
          "
        >
          &lt;&lt;
        </button>

        <button
          class="btn-spotify"
          @click="
            () => {
              spotifyPlayer?.togglePlay();
            }
          "
        >
          {{ isPaused ? "PLAY" : "PAUSE" }}
        </button>

        <button
          class="btn-spotify"
          @click="
            () => {
              spotifyPlayer?.nextTrack();
            }
          "
        >
          &gt;&gt;
        </button>
      </template>
    </header>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  background-color: #333;
  color: #eee;
  font-family: Helvetica, Arial;
  font-size: 3vmin;
}

.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.hidden {
  display: none;
}

.background {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-position: center center;
  /*filter: blur(8em) opacity(0.6);*/
  position: absolute;
}

.main-wrapper {
  padding-top: 45px;
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  width: 80%;
  z-index: 1;
}

.container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
}

.main-container {
  flex: 1;
}

.now-playing__name {
  font-size: 1.5em;
  margin-bottom: 0.2em;
}

.now-playing__artist {
  margin-bottom: 1em;
}

.now-playing__status {
  margin-bottom: 1em;
}

.now-playing__cover {
  border-radius: 8px;
  float: left;
  margin-right: 10px;
  text-align: right;
  width: 300px;
  height: 300px;
}

.now-playing__side {
  margin-left: 2%;
  width: 45%;
}

.btn-spotify {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
.btn-spotify:active {
  position: relative;
  top: 1px;
}

img {
  background: transparent;
}
</style>
