<template>
  <div @click="change()"></div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
    change(){
      this.$routes.push('/mainPage/main')
    }
  }
}
</script>
