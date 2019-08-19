<template>
  <div id="app" class="ui-page horizontal">
    <UiMenu class="ui-layout list vertical spread sidebar" name="root">
      <UiMenuItem custom>
        Smooth UI
      </UiMenuItem>
      <UiMenuItem name="desc">
        首页
      </UiMenuItem>
      <UiMenuItem name="desc">
        介绍
      </UiMenuItem>
      <UiMenu name="components" class="ui-layout list vertical">
        <template #title>
          组件列表
        </template>
        <UiMenuItem name="components/button">按钮 Button</UiMenuItem>
      </UiMenu>
    </UiMenu>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import UiButton from './lib/ui/components/button/UiButton'
  import UiSwitch from './lib/ui/components/button/UiSwitch'
  import UiMenu from './lib/ui/components/menu/UiMenu'
  import UiMenuItem from './lib/ui/components/menu/UiMenuItem'

  export default {
    components: { UiMenuItem, UiMenu, UiSwitch, UiButton },
    data () {
      return {
        loading: false,
        disabled: false
      }
    },
    methods: {
      alert () {
        this.loading = true
      }
    }
  }
</script>

<style lang="less">
  @import "lib/ui/components/layout/layout";

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    overscroll-behavior: none;
  }
</style>

<style lang="less" scoped>

  #app {
    height: 100%;
  }

  .content {
    padding: 12px;
  }
</style>
