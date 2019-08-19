<template>
  <span class="ui-icon-ring">
    <svg class="svg" viewBox="0 0 1 1">
      <circle class="ring" cx="0.5" cy="0.5" :r="0.6 * 0.45" stroke-width="0.1" stroke="currentColor"
              stroke-linecap="round" fill="none"
              :stroke-dasharray="`${0.31 * Math.PI * 1.2},${3.76991112}`"></circle>
    </svg>
  </span>

</template>

<script>
  import Ring from './Ring'

  export default {
    name: 'Loading',
    components: { Ring }
  }
</script>

<style lang="less" scoped>
  @PI: 3.1415926;
  @r: 0.6;

  @keyframes rotate {
    0% {
      transform: rotate(0);
      stroke-dasharray: 0.7 * @PI * @r, @PI * @r;
      animation-timing-function: linear;
    }

    50% {
      transform: rotate(360deg * .5);
      stroke-dasharray: 0.4 * @PI * @r, @PI * @r * 1;
      animation-timing-function: ease;
    }

    100% {
      transform: rotate(360deg);
      stroke-dasharray: 0.7 * @PI * @r, @PI * @r;
      animation-timing-function: ease;
    }
  }

  .ui-icon-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .ring {
      animation: rotate both infinite 2s ease;
      transform-origin: center center;
    }

    .svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
