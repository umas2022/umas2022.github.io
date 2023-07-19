<template>
    <!-- 夜间模式开发页 -->
    <div class="dev-box">
        <NeonLight>Karaoke</NeonLight>
        <NeonLight color="blue">BAR</NeonLight>
        <NeonLight color="red">小龙虾</NeonLight>
        <NeonLight color="green">夜店模式</NeonLight>
        <NeonBorder> <NeonLight>麻辣烫</NeonLight></NeonBorder>
    </div>
</template>

<script lang="ts" setup>
import NeonLight from '@/components/NeonLight.vue';
import NeonBorder from '@/components/NeonBorder.vue';

</script>
<style lang="scss" scoped>

div.dev-box{
    height: 100vh;
    width: 100vw;
    background-color: #141414;
}







</style>