<template>
  <div @click="change()"><NuxtLogo></NuxtLogo></div>
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
