import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import PlaylistView from "./components/main/PlaylistView.vue";
import "./style.css";

const routes = [{ path: "/playlists/:uri", component: PlaylistView }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
