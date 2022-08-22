import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAnglesRight,
  faBackward,
  faBars,
  faCirclePlay,
  faClock,
  faEllipsis,
  faForward,
  faHouseLaptop,
  faHouseSignal,
  faListUl,
  faMicrophone,
  faMusic,
  faPause,
  faPlay,
  faPlus,
  faRecordVinyl,
  faRepeat,
  faShuffle,
  faTableCells,
  faTableCellsLarge,
  faTowerBroadcast,
  faVolumeHigh,
  faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineNuxtPlugin((nuxtApp) => {
  library.add(
    faAnglesRight,
    faBackward,
    faBars,
    faCirclePlay,
    faClock,
    faEllipsis,
    faForward,
    faHouseLaptop,
    faHouseSignal,
    faListUl,
    faMicrophone,
    faMusic,
    faPause,
    faPlay,
    faPlus,
    faRecordVinyl,
    faRepeat,
    faShuffle,
    faTableCells,
    faTableCellsLarge,
    faTowerBroadcast,
    faVolumeHigh,
    faVolumeLow
  );
  // @ts-expect-error: typing issue
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
