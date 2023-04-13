<template>
  <div @click="change()"><NuxtLogo class="logo"/></div>
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
  margin: 50v;

}
</style>