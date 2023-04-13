<template>
    <div class="defaultLayout">
        <a-menu  mode="horizontal" v-model="current">
            <a-menu-item key="/mainPage/FP" @click="change('/mainPage/FP')"> <a-icon type="heart" />功能点度量 </a-menu-item>
            <a-menu-item key="/mainPage/fz" @click="change('/mainPage/fz')"> <a-icon type="picture" />绘图辅助度量 </a-menu-item>
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
        this.current = this.$route.path
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