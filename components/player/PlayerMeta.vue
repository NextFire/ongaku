<script setup lang="ts">
const props = defineProps<{
  player: Spotify.Player;
  playbackState?: Spotify.PlaybackState;
}>();

const spotifyApi = useApi();

const volume = ref<number>(0.25);

watch([() => props.playbackState?.paused, volume], ([paused, volume]) => {
  if (!(paused ?? true)) props.player.setVolume(volume);
});

const spotConnDevices = ref<SpotifyApi.UserDevice[]>([]);

async function refreshConn() {
  const resp = await spotifyApi.value.getMyDevices();
  spotConnDevices.value = resp.devices;
}

async function switchDevice(deviceId: string) {
  await spotifyApi.value.transferMyPlayback([deviceId]);
  refreshConn();
}
</script>

<template>
  <div class="flex items-center justify-center gap-x-6">
    <div class="flex items-center justify-center gap-x-2">
      <font-awesome-icon icon="fa-solid fa-volume-low" class="fa-sm" />
      <input
        type="range"
        max="1"
        step="0.01"
        v-model="volume"
        class="w-20 slider"
        :style="`--progress: ${volume * 100}%`"
      />
      <font-awesome-icon icon="fa-solid fa-volume-high" class="fa-sm" />
    </div>

    <div @mouseenter="refreshConn" class="dropdown dropdown-end dropdown-hover">
      <label tabindex="0" class="btn btn-sm btn-ghost">
        <font-awesome-icon icon="fa-solid fa-house-signal" />
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
              <font-awesome-icon icon="fa-solid fa-house-laptop" />
              <span>{{ device.type }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
