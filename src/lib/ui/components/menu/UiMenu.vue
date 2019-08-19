<template>
  <li v-if="inMenuContext">
    <slot v-if="custom" :active="isOpened" />
    <UiButton v-else>
      <slot name="title" :active="isOpened" />
    </UiButton>
    <transition
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <ul v-show="isOpened" class="ui-menu submenu">
        <slot />
      </ul>
    </transition>
  </li>
  <ul v-else class="ui-menu">
    <slot />
  </ul>
</template>

<script>
  import { MENU_OPEN, MENU_OPENED, MENU_TRIGGER } from './symbols'
  import UiButton from '../button/UiButton'

  export default {
    name: 'UiMenu',
    components: { UiButton },
    inject: {
      inMenuContext: {
        default: false
      },
      menuOpen: {
        from: MENU_OPEN, default: () => () => {}
      },
      menuOpened: {
        from: MENU_OPENED,
        default: () => () => this.opened
      },
      menuTrigger: {
        from: MENU_TRIGGER,
        default: null
      }
    },
    provide () {
      return {
        [MENU_TRIGGER]: (name) => {
          this.trigger(name)
        },
        [MENU_OPEN]: (name) => {
          let index
          if ((index = this.opened.indexOf(name)) === -1) {
            this.opened.push(name)
          } else {
            this.opened.splice(index, 1)
          }
          console.log(this.opened)
        },
        inMenuContext: true,
        trigger: () => {
          this.menuOpen(this.name)
        },
        [MENU_OPENED]: this.opened
      }
    },
    methods: {
      trigger (name) {
        if (this.menuTrigger) {
          this.menuTrigger(name)
          return
        }
        if (!this.$listeners.trigger) {
          if (this.$route.name !== name) {
            this.$router.push({
              name
            })
          }
        }
      },
      enter (el, done) {
        el.style.height = ''
        const height = el.getBoundingClientRect().height + 'px'
        el.style.height = '0px'
        el.addEventListener('transitionend', (e) => {
          done()
        }, { once: true })

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.height = height
          })
        })
      },
      afterEnter (el) {
        el.style.height = ''
      },
      leave (el, done) {
        el.style.height = el.getBoundingClientRect().height + 'px'

        el.addEventListener('transitionend', (e) => {
          done()
        }, { once: true })

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.height = '0'
          })
        })
      },
      afterLeave (el, done) {
        el.style.height = ''
      }
    },
    props: {
      custom: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: false
      }
    },
    computed: {
      isOpened () {
        if (this.inMenuContext) {
          return this.menuOpened.indexOf(this.name) !== -1
        } else {
          return true
        }
      }
    },
    data () {
      return {
        opened: [],
        submenuHeight: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/variables";


  .ui-menu {
    background: multiply(#777, @primary-color);

    &.submenu {
      box-sizing: border-box;
      padding-left: 12px;
      &.v-enter-active, &.v-leave-active {
        transition: height .4s;
        overflow: hidden;
      }
    }
  }
</style>
