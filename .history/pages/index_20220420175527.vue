<template>
  <div @click="change()"></div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
    change(){
      this.$routers.push('/mainPage/main')
    }
  }
}
</script>
