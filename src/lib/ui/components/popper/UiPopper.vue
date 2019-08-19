<template>
  <div class="ui-popper">
    <slot :show="show"/>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import { createTriggerContext } from './triggerContext'

  export default {
    name: 'UiPopper',
    props: {
      reference: {
        type: [String, Object],
        default: 'default'
      },
      delegate: {
        type: [Number, Boolean],
        default: false
      }
    },
    data () {
      return {
        context: null
      }
    },
    mounted () {
      if(this.delegateTarget.__popper_mounted) {
        this.initialize()
      } else {
        this.delegateTarget.$once('hook:mounted', () => {
          this.delegateTarget.__popper_mounted = true
          this.initialize()
        })
      }
    },
    destroyed () {
      if (this.__popper_instance) {
        this.__popper_instance.destroy()
      }
    },
    computed: {
      show () {
        if (!this.context) {
          return false
        } else {
          return this.context.state.show
        }
      },
      delegateTarget () {
        if (this.delegate) {
          let target = this.$parent
          const count = this.delegate === true ? 1 : this.delegate
          for (let i = 0; i < count; i++) {
            if (target.$parent) {
              target = target.$parent
            } else {
              throw new Error('Invalid popper reference delegate depth.')
            }
          }
          return target
        } else {
          return this.$parent
        }
      },
      popperReference () {
        if (typeof this.reference === 'string') {
          if (!this.delegateTarget.__popperReferences) {
            throw new Error('No popper references found.')
          }
          if (!this.delegateTarget.__popperReferences[this.reference]) {
            throw new Error(`No popper reference named '${this.reference}' found.`)
          }
          return this.delegateTarget.__popperReferences[this.reference]
        } else {
          return this.reference
        }
      }
    },
    methods: {
      initialize () {
        this.$watch('popperReference', (ref) => {
          if (this.__popper_instance) {
            this.__popper_instance.destroy()
            this.__popper_instance = null
          }
          if (this.context) {
            this.context.destroy()
            this.context = null
          }
          this.__popper_instance = new Popper(ref.el || ref, this.$el, { eventsEnabled: true })
          if (ref.triggers) {
            this.context = createTriggerContext(ref.el || ref, this.$el, ref.triggers)
          }
        }, {
          immediate: true
        })
      }
    },
    watch: {}
  }
</script>

<style scoped>

</style>
