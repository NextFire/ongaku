<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouseLaptop,
  faHouseSignal,
  faVolumeHigh,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SpotifyWebApi from "spotify-web-api-js";
import { ref, watch } from "vue";

library.add(faVolumeLow, faVolumeHigh, faHouseSignal, faHouseLaptop);

const props = defineProps<{
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
}>();

const volume = ref<number>(0.25);

watch([() => props.playbackState?.paused, volume], ([paused, volume]) => {
  if (!(paused ?? true)) props.player.setVolume(volume);
});

const spotConnDevices = ref<SpotifyApi.UserDevice[]>([]);

async function refreshConn() {
  const resp = await props.spotifyApi.getMyDevices();
  spotConnDevices.value = resp.devices;
}

async function switchDevice(deviceId: string) {
  await props.spotifyApi.transferMyPlayback([deviceId]);
  refreshConn();
}
</script>

<template>
  <div class="flex items-center justify-center gap-x-6">
    <div class="flex items-center justify-center gap-x-2">
      <FontAwesomeIcon icon="fa-solid fa-volume-low" class="fa-sm" />
      <input
        type="range"
        max="1"
        step="0.01"
        v-model="volume"
        class="w-20 slider"
        :style="`--progress: ${volume * 100}%`"
      />
      <FontAwesomeIcon icon="fa-solid fa-volume-high" class="fa-sm" />
    </div>

    <div @mouseenter="refreshConn" class="dropdown dropdown-end dropdown-hover">
      <label tabindex="0" class="btn btn-sm btn-ghost">
        <FontAwesomeIcon icon="fa-solid fa-house-signal" />
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li
          v-for="device in spotConnDevices.filter((d) => d.id !== null)"
          :key="device.id!"
        >
          <a
            @click="switchDevice(device.id!)"
            class="grid grid-rows-2"
            :class="{ active: device.is_active }"
          >
            <span>{{ device.name }}</span>
            <span class="text-sm space-x-2">
              <FontAwesomeIcon icon="fa-solid fa-house-laptop" />
              <span>{{ device.type }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
