<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Responsive class="a" :class="['b', 'c']" :add-class="false">
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
  import Responsive from '@/lib/functional-component/Responsive'

  export default {
    name: 'home',
    components: {
      Responsive,
      HelloWorld
    }
  }
</script>
