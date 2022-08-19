<template>
  <div class="p-1 grid grid-cols-[30%_40%_30%]">
    <PlayerControls />
    <PlayerDisplay />
    <PlayerMeta />
  </div>
</template>

<style>
.slider[type="range"] {
  display: block;
  height: 100%;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  --playerScrubberFill: rgba(0, 0, 0, 0.5);
  --playerScrubberTrack: rgba(0, 0, 0, 0.1);
  @apply dark:[--playerScrubberFill:rgba(255,_255,_255,_0.6)] dark:[--playerScrubberTrack:rgba(255,_255,_255,_0.1)];
}

.slider[type="range"]::-ms-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}

.slider[type="range"]::-webkit-slider-runnable-track {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-image: linear-gradient(
    90deg,
    var(--playerScrubberFill) var(--progress),
    var(--playerScrubberTrack) var(--progress)
  );
}
</style>
