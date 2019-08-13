<script>
  import { selectSizer, useResponsiveSizer } from '@/lib/observable/responsiveSizer'
  import { windowSize } from '@/lib/observable/browser/window'
  import { mergeClasses } from '@/lib/functional-component/utils'

  export default {
    name: 'Responsive',
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'DIV'
      },
      addClass: {
        type: Boolean,
        default: true
      }
    },
    render (h, ctx) {
      const sizer = useResponsiveSizer()
      const sizeName = selectSizer(sizer, ctx.scopedSlots)
      let children

      // if failed to select size, render no child.
      if (sizeName === null) {
        children = undefined
      } else {
        children = [ctx.scopedSlots[sizeName](windowSize)]
      }
      return h(ctx.props.tag, {
        class: mergeClasses(ctx, ctx.props.addClass ? sizeName : null)
      }, children)
    }
  }
</script>

<style scoped>

</style>
