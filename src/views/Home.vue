<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" height="200" v-popper-reference.click.hover>

    <UiDropdown popper-reference="default">a</UiDropdown>

    <UiMenu class="ui-layout list vertical" name="root">
      <UiMenuItem name="a" custom>
        <UiButton loading>hi</UiButton>
      </UiMenuItem>
      <UiMenuItem name="b">b</UiMenuItem>
      <UiMenuItem name="c">
        hi
      </UiMenuItem>
      <UiMenuItem name="d">
        hi
      </UiMenuItem>
      <UiMenu name="sub">
        <template #title>
          Title
        </template>
        <UiMenuItem name="sub.c">c</UiMenuItem>
        <UiMenuItem name="sub.d">d</UiMenuItem>
      </UiMenu>
    </UiMenu>

    <Responsive ref="popper" class="a" :class="['b', 'c']" :add-class="false">
      default
      <template #sm="{width, height}">
        sm {{width}}px x {{height}}px
      </template>
      <template #md>
        md
      </template>

      <template #xl>
        xl
      </template>
    </Responsive>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Responsive from '@/lib/components/functional-component/Responsive'
  import { popperReference } from '../lib/ui/components/popper/directive'
  import UiPopper from '../lib/ui/components/popper/UiPopper'
  import UiDropdown from '../lib/ui/components/dropdown/UiDropdown'
  import UiMenu from '../lib/ui/components/menu/UiMenu'
  import UiMenuItem from '../lib/ui/components/menu/UiMenuItem'
  import UiButton from '../lib/ui/components/button/UiButton'
  import '@/lib/ui/components/layout/layout.less'

  export default {
    name: 'home',
    components: {
      UiButton,
      UiMenuItem,
      UiMenu,
      UiDropdown,
      UiPopper,
      Responsive,
      HelloWorld
    },
    data () {
      return {
        reference: ''
      }
    },
    mounted () {
    },
    directives: {
      popperReference
    }
  }
</script>
