<template>
    <div class="defaultLayout">
        <a-menu  mode="horizontal">
            <a-menu-item key="/mainPage/zg"> <a-icon type="heart" />简单主观度量 </a-menu-item>
            <a-menu-item key="/mainPage/fz"> <a-icon type="picture" />绘图辅助度量 </a-menu-item>
        </a-menu>
        <Nuxt class="nt"></Nuxt>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
.defaultLayout{
    display: block;
    width: 100%;
    height: 100%;
}
.nt{
    width: 172vh;
    height: 90vh;
    max-height: 90vh;
    margin-top: 2vh;
    overflow-y: scroll;
    float: right;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 30%);
}
</style>