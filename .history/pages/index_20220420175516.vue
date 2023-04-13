<template>
  <div @click="change()"></div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
    change(){
      this.$route.push('/mainPage/main')
    }
  }
}
</script>
