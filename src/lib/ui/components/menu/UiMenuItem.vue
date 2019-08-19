<template>
  <li class="ui-menuitem">
    <slot v-if="custom" />
    <UiButton v-else>
      <slot />
    </UiButton>
  </li>
</template>

<script>
  import { MENU_TRIGGER } from './symbols'
  import UiButton from '../button/UiButton'

  export default {
    name: 'UiMenuItem',
    components: { UiButton },
    inject: {
      menuTrigger: MENU_TRIGGER,
    },
    provide () {
      return {
        trigger: () => {
          this.menuTrigger(this.name)
        }
      }
    },
    props: {
      name: {
        type: String,
        required: false
      },
      custom: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/variables";

  .ui-menuitem {
    display: block;
    line-height: 48px;
    text-align: center;
    color: white;
    font-size: @default-font-size * 1.2;
    user-select: none;
  }
</style>
