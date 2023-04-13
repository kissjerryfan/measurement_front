<template>
    <div class="defaultLayout">
        <a-menu  mode="horizontal" v-model="current">
            <a-menu-item key="/mainPage/FP" @click="change('/mainPage/FP')"> <a-icon type="heart" />功能点度量 </a-menu-item>
            <a-menu-item key="/mainPage/UMLClass" @click="change('/mainPage/UMLClass')"> <a-icon type="picture" />类图辅助度量 </a-menu-item>
            <a-menu-item key="/mainPage/UMLUserCase" @click="change('/mainPage/UMLUserCase')"> <a-icon type="user" />用例图辅助度量 </a-menu-item>
            <a-menu-item key="/mainPage/DataFlow" @click="change('/mainPage/DataFlow')"> <a-icon type="line" />控制流图辅助度量 </a-menu-item>
            <a-menu-item key="/mainPage/AST" @click="change('/mainPage/AST')"> <a-icon type="star" />代码辅助度量 </a-menu-item>

        </a-menu>
        <Nuxt></Nuxt>
    </div>
</template>
<script >
export default {
    data(){
        return{
            current:['/mainPage/FP']
        }
    },
    methods:{
        change(dir){
            this.$router.push(dir)
        }
    },
    mounted(){
        this.current = [this.$route.path]
    }
}
</script>
<style lang="scss" scoped>
.defaultLayout{
    display: block;
    width: 100%;
    height: 100%;
}
</style>