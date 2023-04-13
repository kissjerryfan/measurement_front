<template>
    <div class="defaultLayout">
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