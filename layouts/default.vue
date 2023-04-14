<template>
  <div>
    <el-menu
      style="position: fixed;top: 0;left: 0;height: 100%;"
      default-active="1"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item @click="toggleCollapse">
        <i id="fold" class="el-icon-s-fold"></i>
      </el-menu-item>
      <el-menu-item index="1" @click="change('/mainPage/FP')">
        <i class="el-icon-s-home"></i>
        <span slot="title">功能点度量</span>
      </el-menu-item>
      <el-menu-item index="2" @click="change('/mainPage/UMLClass')">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">类图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="3" @click="change('/mainPage/UMLUserCase')">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">用例图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="4" @click="change('/mainPage/DataFlow')">
        <i class="el-icon-share"></i>
        <span slot="title">控制流图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="5" @click="change('/mainPage/AST')">
        <i class="el-icon-paperclip"></i>
        <span slot="title">代码辅助度量</span>
      </el-menu-item>

    </el-menu>
    <Nuxt :style="nuxtStyle"></Nuxt>
  </div>

</template>


<script>
export default {
  data(){
    return{
      current:['/mainPage/FP'],
      isCollapse: false,
      nuxtStyle: {
        marginLeft: '240px',
        transition: 'margin 0.5s'
      }
    }
  },

  methods: {
    change(dir){
      this.$router.push(dir)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.nuxtStyle.marginLeft = '100px';
      } else {
        this.nuxtStyle.marginLeft = '240px';
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
