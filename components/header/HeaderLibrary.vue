<template>
  <div>
    <li class="menu-title">
      <span>Library</span>
    </li>
    <li>
      <NuxtLink
        to="/collection/recents"
        :class="{ active: $route.name === 'collection-recents' }"
      >
        <font-awesome-icon icon="fa-solid fa-clock" />
        Recently Added
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/collection/artists"
        :class="{ active: $route.name === 'collection-artists' }"
      >
        <font-awesome-icon icon="fa-solid fa-microphone" />
        Artists
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/collection/albums"
        :class="{ active: $route.name === 'collection-albums' }"
      >
        <font-awesome-icon icon="fa-solid fa-record-vinyl" />
        Albums
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/collection/tracks"
        :class="{ active: $route.name === 'collection-tracks' }"
      >
        <font-awesome-icon icon="fa-solid fa-music" />
        Songs
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/collection/podcasts"
        :class="{ active: $route.name === 'collection-podcasts' }"
      >
        <font-awesome-icon icon="fa-solid fa-tower-broadcast" />
        Podcasts
      </NuxtLink>
    </li>
  </div>
</template>

<style scoped>
.svg-inline--fa {
  @apply w-[14px];
}
a:not(.active) .svg-inline--fa {
  @apply text-primary;
}
</style>
