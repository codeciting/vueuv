<template>
  <div
    class="ui-switch"
    :class="{pressing: pressing || loading === 'pressing', on: isOn, loading}"
    role="button"
    :tabindex="(disabled || loading) ? '' : tabindex"
    :aria-pressed="pressing ? 'mixed' : isOn ? 'true' : 'false'"
    :aria-disabled="disabled || loading"
    :disabled="disabled || loading"
    :aria-label="label ? label : isOn ? onText : offText"
    @click="() => click()"
    @mousedown="() => mousedown()"
    @mouseup="() => mouseup(true)"
    @mouseleave="() => mouseup(false)"
    @keypress.enter.space="() => click()"
  >
    <div class="border">
      <span class="text on">
        {{onText}}
      </span>
      <span class="text off">
        {{offText}}
      </span>
    </div>
    <div class="button">
      <transition>
        <Loading v-if="loading" class="loading-icon" />
      </transition>
    </div>
    <transition>
      <div v-if="loading && !disabled" class="loading-mask"></div>
    </transition>
  </div>
</template>

<script>
  import Loading from '../svg-icon/Loading'

  export default {
    name: 'UiSwitch',
    components: { Loading },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: [Boolean, String],
        default: false
      },
      onText: {
        type: String,
        default: ''
      },
      offText: {
        type: String,
        default: ''
      },
      tabindex: {
        type: [String, Number],
        default: 0
      },
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isOn: this.value,
        pressing: false
      }
    },
    methods: {
      click () {
        if (this.loading || this.disabled) {
          return
        }
        this.isOn = !this.isOn
        if (!this.pressing) {
          this.pressing = true
          this.mouseup(true)
        }
      },
      mousedown () {
        if (this.loading || this.disabled) {
          return
        }
        this.pressing = true
        if (this.__timeout) {
          clearTimeout(this.__timeout)
          this.__timeout = undefined
        }
      },
      mouseup (trigger) {
        if (!this.pressing) {
          return
        }
        this.__timeout = setTimeout(() => {
          this.pressing = false
          this.__timeout = undefined
        }, 150)
      }
    },
    watch: {
      isOn (value) {
        this.$emit('update:value', value)
      },
      value (value) {
        this.isOn = value
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/variables";

  @switch-color: @color-gray;
  @switch-off-background: @primary-color-contrast;
  @switch-off-text-color: @color-gray;
  @switch-disabled-off-color: @disabled-color;
  @switch-on-background: @primary-color;
  @switch-on-text-color: @primary-color-contrast;
  @switch-disabled-background: @disabled-color-contrast;
  @switch-disabled-color: @disabled-color;

  @switch-height: @default-height;
  @switch-width: @switch-height * 2;
  @switch-border-width: 2px;
  @switch-border-color: @color-gray;
  @switch-button-shadow-color: rgba(0, 0, 0, 0.35);

  @switch-button-size: @switch-height - 4;
  @switch-button-expanding-width: 12px;

  .ui-switch {
    font-size: @default-font-size;
    color: @switch-color;
    display: inline-block;
    vertical-align: middle;

    border-radius: @switch-width / 2;
    outline: none;
    height: @switch-height;
    width: @switch-width;
    position: relative;
    cursor: pointer;

    transition: all .4s;

    .border {
      display: flex;
      justify-content: center;
      height: @switch-height;
      width: @switch-width;
      border-radius: @switch-height / 2;
      border: @switch-border-width solid @switch-border-color;
      box-sizing: border-box;
      transition: all .6s;
      padding-left: 2px;
      padding-right: 2px;

      .text {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        transition: all .4s;

        &.on {
          color: @switch-on-text-color;
        }

        &.off {
          color: @switch-off-text-color;
        }
      }
    }

    &.on {
      .border {
        background: @switch-on-background;
        border-color: @switch-on-background;

        .on {
          opacity: 1;
        }

        .off {
          opacity: 0;
        }
      }
    }

    &:not(.on) {
      .border {
        background: @switch-off-background;

        .on {
          opacity: 0;
        }

        .off {
          opacity: 1;
        }
      }
    }

    .button {
      position: absolute;
      top: @switch-border-width;
      left: @switch-border-width;
      width: @switch-button-size;
      background: @switch-off-background;
      height: @switch-button-size;
      border-radius: (@switch-button-size - @switch-border-width) / 2;
      box-shadow: @switch-button-shadow-color 1px 1px 5px;
      transition: all .4s ease;
      transform: scale(1);
      display: flex;
      justify-content: center;
      align-items: center;

      > .loading-icon {
        width: 100%;
        height: 100%;
        transition: all .4s;

        &.v-enter-active, &.v-leave-active {
          opacity: 0;
          transform: scale(0);
        }

        &.v-enter-to, &.v-leave {
          opacity: 1;
          transform: scale(1);
        }

      }
    }

    .loading-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: @switch-disabled-background;
      opacity: 0.4;
      transition: all .4s;
      border-radius: @switch-width / 2;

      &.v-enter-active, &.v-leave-active {
        opacity: 0;
      }

      &.v-enter-to, &.v-leave {
        opacity: 0.4;
      }

    }

    &.pressing {
      .button {
        width: @switch-button-size + @switch-button-expanding-width;
      }
    }

    &.on {
      @button-on-offset: @switch-border-width + (@switch-width - @switch-border-width * 2 - @switch-button-size);

      &:not(.pressing) {
        .button {
          left: @button-on-offset;
        }
      }

      &.pressing {
        .button {
          left: @button-on-offset - @switch-button-expanding-width;
        }
      }
    }

    &[disabled] {
      cursor: @cursor-disabled;
      color: @switch-disabled-color;

      &:not(.on) {
        .border {
          background: @switch-disabled-background;
          border-color: @switch-disabled-background;
        }
      }

      &.on {
        .border {
          background: multiply(@switch-disabled-background, @switch-on-background);
          border-color: multiply(@switch-disabled-background, @switch-on-background);
        }
      }

      .button {
        background: @switch-disabled-background;
      }

      .border {
        .text.off {
          color: @switch-disabled-off-color;
        }
      }
    }

    &.loading {
      cursor: @cursor-loading;
    }

    &:focus {
      .focus-block(@primary-color)
    }

  }
</style>
