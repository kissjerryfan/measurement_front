<template>
  <div @click="change()" class="logo"><NuxtLogo /></div>
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
  margin-left: 50vh;

}
</style>