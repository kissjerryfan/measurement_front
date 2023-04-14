<template>
  <div>
<!--    <div class="toggle-button" @click="toggleCollapse" style="height: 50px;width: 550px"><i id="fold" class="el-icon-s-fold"></i></div>-->
    <el-menu
      style="position: fixed;top: 0;left: 0;height: 100%;"
      :width="isCollapse?'64px':'200px'"
      default-active="1"
      :collapse-transition="false"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="toggleCollapse">
        <i id="fold" class="el-icon-s-fold"></i>
      </el-menu-item>
      <el-menu-item index="2" @click="change('/mainPage/FP')">
        <i class="el-icon-s-home"></i>
        <span slot="title">功能点度量</span>
      </el-menu-item>
      <el-menu-item index="3" @click="change('/mainPage/UMLClass')">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">类图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="4" @click="change('/mainPage/UMLUserCase')">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">用例图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="5" @click="change('/mainPage/DataFlow')">
        <i class="el-icon-share"></i>
        <span slot="title">控制流图辅助度量</span>
      </el-menu-item>
      <el-menu-item index="6" @click="change('/mainPage/AST')">
        <i class="el-icon-paperclip"></i>
        <span slot="title">代码辅助度量</span>
      </el-menu-item>

    </el-menu>
    <Nuxt style="margin-left: 200px"></Nuxt>
  </div>

</template>


<script>
export default {
  data(){
    return{
      current:['/mainPage/FP'],
      isCollapse: false
    }
  },

  methods: {
    change(dir){
      this.$router.push(dir)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      if(this.isCollapse === true){
        //document.getElementById("fold").setAttribute("class","el-icon-s-unfold")
        document.getElementById("fold").className = "el-icon-s-unfold"
        //alert(this.isCollapse)
      }
      else
      {
        //document.getElementById("fold").setAttribute("class","el-icon-s-fold")
        document.getElementById("fold").className = "el-icon-s-fold"
        //alert(this.isCollapse)
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
.toggle-button:hover {
  background: rgb(67, 74, 80);
}
.toggle-button{
  background: #545c64;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
}
</style>
