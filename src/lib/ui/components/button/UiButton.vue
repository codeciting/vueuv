<template>
  <button
    class="ui-button"
    :class="{clicking, loading, 'menu-button': isMenuButton, active}"
    @click="() => click()"
    @mousedown="() => mousedown()"
    @mouseup="() => mouseup()"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-label="label"
  >
    <span class="text">
      <slot />
    </span>
    <transition>
      <Loading v-if="loading" class="loading-icon" />
    </transition>
  </button>
</template>

<script>
  import Ring from '../svg-icon/Ring'
  import Loading from '../svg-icon/Loading'

  export default {
    name: 'UiButton',
    inject: {
      trigger: {
        type: Function,
        default: () => () => {}
      },
      inMenuContext: {
        type: Boolean,
        default: false
      }
    },
    components: { Loading, Ring },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: undefined
      },
      isMenuButton: {
        type: Boolean,
        default () {
          return this.inMenuContext
        }
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        clicking: false
      }
    },
    methods: {
      click () {
        if (this.disabled || this.loading) {
          return
        }
        if (!this.clicking) {
          this.mousedown()
          setTimeout(() => this.mouseup(), 150)
        }
        this.$emit('click')
        this.trigger()
      },
      mousedown () {
        if (this.disabled || this.loading) {
          return
        }
        this.clicking = true
        if (this.__timeout) {
          clearTimeout(this.__timeout)
          this.__timeout = undefined
        }
      },
      mouseup () {
        this.__timeout = setTimeout(() => {
          this.clicking = false
          this.__timeout = undefined
        }, 150)
      }
    }
  }
</script>

<style lang="less">
  @import "../../styles/variables.less";

  /* Button color mixin*/
  .themed-button(@btn-color, @btn-background, @border-radius, @btn-disabled-color, @btn-disabled-background) {
    color: @@btn-color;
    background: @@btn-background;
    height: @default-height;
    line-height: @default-height;

    border-radius: @border-radius;

    &:focus {
      .focus-block(@@btn-background);
      background: lighten(@@btn-background, 10%);
    }

    &:hover {
      background: lighten(@@btn-background, 15%);
    }

    &.clicking, &:hover.clicking {
      background: lighten(@@btn-background, 2%);
      box-shadow: none;
    }


    &[disabled], &.loading {
      color: @@btn-disabled-color;
      background: @@btn-disabled-background;
    }
  }

  /* Button size mixin*/
  .sized-button(@btn-font-size-multiplier, @btn-height, @btn-padding, @btn-loading-icon-size, @btn-loading-icon-gap) {

    font-size: @default-font-size * @btn-font-size-multiplier;
    height: @btn-height;
    line-height: @btn-height;
    padding-left: @btn-padding;
    padding-right: @btn-padding;


    > .loading-icon {
      width: @btn-loading-icon-size;
      height: @btn-loading-icon-size;
      margin-left: @btn-loading-icon-gap;

      &.v-enter, &.v-leave-to {
        margin-left: @btn-loading-icon-gap;
      }

      &.v-enter-active, &.v-leave-active {
        margin-left: @btn-padding + @btn-loading-icon-gap;
        margin-right: -(@btn-loading-icon-size + @btn-padding + @btn-loading-icon-gap);
      }

    }
  }

  .ui-button {
    .clear-button();

    @btn-color: primary-color-contrast;
    @btn-background: primary-color;
    @btn-disabled-color: disabled-color;
    @btn-disabled-background: disabled-color-contrast;

    @btn-font-size-multiplier: 1;
    @btn-padding: 12px;
    @btn-loading-icon-size: @default-height / 2;
    @btn-loading-icon-gap: 4px;

    text-align: center;
    cursor: pointer;
    transition: all .45s ease;
    user-select: none;
    align-items: center;
    overflow: hidden;

    > .text {
      vertical-align: middle;
    }

    > .loading-icon {
      vertical-align: middle;
      transition: all .4s;
      margin-right: 0;

      &.v-enter, &.v-leave-to {
        margin-right: 0;
        opacity: 0;
      }

      &.v-enter-active, &.v-leave-active {
        opacity: 1;
      }

    }

    &[disabled] {
      cursor: @cursor-disabled;
    }

    &.loading {
      cursor: @cursor-loading;
    }


    .themed-button(@btn-color, @btn-background, 4px, @btn-disabled-color, @btn-disabled-background);
    .sized-button(@btn-font-size-multiplier, @default-height, @btn-padding, @btn-loading-icon-size, @btn-loading-icon-gap);


    &.menu-button {
      width: 100%;

      @color: white;
      @background: multiply(#777, @primary-color);
      text-align: left;

      .themed-button(color, background, 0, btn-disabled-color, btn-disabled-background);
      .sized-button(1.2, 48px, @btn-padding, @btn-loading-icon-size,
        12px);

      &:focus {
        box-shadow: none !important;
      }

      &.active {
        .focus-block(@@btn-background);
      }
    }

  }
</style>
