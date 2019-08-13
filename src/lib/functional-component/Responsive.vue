<template>
  <component :is="tag">
    <slot :name=""/>
  </component>
</template>

<script>
  export default {
    name: 'Responsive',
    props: {
      tag: {
        type: String,
        default: 'DIV'
      }
    }
  }
</script>

<style scoped>

</style>
