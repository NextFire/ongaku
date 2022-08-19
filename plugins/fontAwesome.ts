import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faCirclePlay,
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
  faTableCellsLarge,
  faTowerBroadcast,
  faVolumeHigh,
  faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineNuxtPlugin((nuxtApp) => {
  library.add(
    faBackward,
    faCirclePlay,
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
    faTableCellsLarge,
    faTowerBroadcast,
    faVolumeHigh,
    faVolumeLow
  );
  // @ts-ignore: typing issue
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
