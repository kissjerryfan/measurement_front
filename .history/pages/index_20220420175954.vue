<template>
  <div @click="change()"><NuxtLogo class="logo"/><h2>Merlin Garden</h2></div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
    change(){
      this.$router.push('/mainPage/main')
    }
  }
}
</script>
<style lang='scss' scoped>
.logo{
  margin-left: 80vh;
  margin-top: 30vh;
}
</style>