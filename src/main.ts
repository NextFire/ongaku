import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faClock,
  faForward,
  faHouseLaptop,
  faHouseSignal,
  faListUl,
  faMicrophone,
  faMusic,
  faPause,
  faPlay,
  faRecordVinyl,
  faRepeat,
  faShuffle,
  faTableCells,
  faVolumeHigh,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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

library.add(
  faBackward,
  faClock,
  faForward,
  faHouseLaptop,
  faHouseSignal,
  faListUl,
  faMicrophone,
  faMusic,
  faPause,
  faPlay,
  faRecordVinyl,
  faRepeat,
  faShuffle,
  faTableCells,
  faVolumeHigh,
  faVolumeLow
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
