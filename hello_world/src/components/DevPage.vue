<template>
    <div class="dev-box">
        <h3>视频测试</h3>
        <!-- <img width="300" src="test/test.mp4" crossorigin="anonymous" alt="Online Image"> -->

        <video v-if="url_type(source_url)=='video'" controls >
            <source :src="source_url" type="video/mp4">
            <source :src="source_url" type="video/webm">
        </video>
        <img v-else-if="url_type(source_url)=='image'" :src="source_url" >
        <span v-else> Video format is not supported: {{ source_url }}</span>

        <el-button type="danger" @click=test_button>test</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"

import { url_type } from "@/utils/tools.js"

const source_url = "test/test.mp4"
// const source_url = "favicon.png"

const test_button = () => {
    console.log("test")
    console.log(source_url.split('.').pop())
    
}
</script>
<style lang="scss" scoped>
div.dev-box {
    height: 100vh;
    width: 100vw;
    margin-left: 150px;
    border: solid 1px red;

    video{
        width: 30%;
    }
    image{
        width: 30%;
    }
}
</style>