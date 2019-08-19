<template>
  <ui-popper ref="popper" :reference="popperReference" :delegate="1" class="ui-dropdown-popper" v-slot="{show}">
    <transition>
      <div v-show="show" class="dropdown">
        <slot />
      </div>
    </transition>
  </ui-popper>
</template>

<script>
  import UiPopper from '../popper/UiPopper'
  import { popperReference } from '../popper/directive'

  export default {
    name: 'UiDropdown',
    components: { UiPopper },
    props: {
      trigger: {
        type: [String],
        default: 'hover'
      },
      popperReference: {
        type: String,
        required: false
      }
    },
    directives: {
      popperReference
    },
    beforeDestroy () {

    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .ui-dropdown-popper {
    height: max-content;
    width: max-content;

    .dropdown {
      min-width: 240px;
      border-radius: 4px;
      background: white;
      box-shadow: rgba(0, 0, 0, 0.15) 0 0 12px;

      transition: all .3s;

      &.v-enter-active, &.v-leave-active {
        transform: translateY(-20px);
        opacity: 0;
      }

      &.v-enter-to, &.v-leave {
        transform: translateY(0);
        opacity: 1;
      }

    }
  }
</style>
