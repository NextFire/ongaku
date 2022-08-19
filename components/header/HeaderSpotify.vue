<template>
  <div>
    <li class="menu-title">
      <span>Spotify</span>
    </li>
    <li>
      <NuxtLink to="/" :class="{ active: $route.name === 'index' }">
        <font-awesome-icon icon="fa-solid fa-circle-play" />
        Listen Now
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/explore" :class="{ active: $route.name === 'explore' }">
        <font-awesome-icon icon="fa-solid fa-table-cells-large" />
        Explore
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
