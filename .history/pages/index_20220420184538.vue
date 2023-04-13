<template>
  <div @click="change()">
    <NuxtLogo class="logo"/>
    <h1>Merlin Garden</h1>
  </div>
</template>

<script>
export default {
  layout:'index',
  methods:{
    change(){
      this.$router.push('/mainPage/FP')
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
  margin-left: 73vh;
  margin-top: 5vh;
  font-size: 4em;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}
</style>