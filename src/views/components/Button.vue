<template>
  <article>
    <h2>按钮 - Button</h2>
    <p>按钮用来点击！</p>
    <h3>普通按钮</h3>
    <p>
      <UiButton>点我！</UiButton>
    </p>
    <h3>加载中按钮</h3>
    <p>
      <UiButton loading>加载中呢</UiButton>
    </p>
    <h3>禁用按钮</h3>
    <p>
      <UiButton disabled>禁用了！</UiButton>
    </p>
    <h3>自由控制</h3>
    <p>
      <UiButton :loading="loading" :disabled="disabled">一个委屈的按钮</UiButton>
      <br>
      <br>
      <span>
        加载状态：<UiSwitch :value.sync="loading" />
      </span>
      <br>
      <br>
      <span>
        禁用状态：<UiSwitch :value.sync="disabled" />
      </span>

    </p>
  </article>
</template>

<script>
  import UiButton from '../../lib/ui/components/button/UiButton'
  import UiSwitch from '../../lib/ui/components/button/UiSwitch'

  export default {
    components: { UiSwitch, UiButton },
    data () {
      return {
        disabled: false,
        loading: false
      }
    }
  }
</script>

<style scoped>

</style>
