<template>
  <div @click="change()">
    <NuxtLogo class="logo"/>
    <h1>Merlin Garden</h1>
  </div>
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
h1{
  margin-left: 80vh;
  margin-top: 5vh;
  font: 10em sans-serif;
}
</style>