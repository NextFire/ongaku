<template>
  <div>
    <li class="menu-title">
      <span>Library</span>
    </li>
    <li>
      <NuxtLink to="/songs" :class="{ active: $route.name === 'songs' }">
        <font-awesome-icon icon="fa-solid fa-music" />
        Songs
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/podcasts" :class="{ active: $route.name === 'podcasts' }">
        <font-awesome-icon icon="fa-solid fa-tower-broadcast" />
        Podcasts
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/artists" :class="{ active: $route.name === 'artists' }">
        <font-awesome-icon icon="fa-solid fa-microphone" />
        Artists
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/albums" :class="{ active: $route.name === 'albums' }">
        <font-awesome-icon icon="fa-solid fa-record-vinyl" />
        Albums
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
