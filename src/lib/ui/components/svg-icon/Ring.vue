<template functional>
  <svg viewBox="0 0 1 1" stroke-width="0.1" stroke="currentColor" stroke-linecap="round"
       fill="none">
    <circle cx="0.5" cy="0.5" :r="props.r * 0.45"
            :stroke-dasharray="`${props.percent / 2 * Math.PI * 2 * props.r},${Math.PI * 2 * props.r}`"></circle>
  </svg>
</template>

<script>
  export default {
    name: 'Ring',
    functional: true,
    props: {
      percent: {
        type: Number,
        default: 0.618
      },
      r: {
        type: Number,
        default: 1
      }
    }
  }
</script>
