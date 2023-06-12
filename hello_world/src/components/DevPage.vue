<template>
    <div class="dev-box">
        <h3>静态资源跨项目访问demo</h3>
        <img width="300" v-for="item in image_urls" :key="item" :src="item" crossorigin="anonymous" alt="Online Image">

        <el-button type="danger" @click=get_list_img>test</el-button>
        {{ image_index }}
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"
import { ref } from "vue"
import type { Ref } from "vue"

import { url_image_list, url_sticker_list, url_video_list, url_tag_list } from "@/utils/url.js"
import { url_image, url_sticker, url_video } from "@/utils/url.js"

const image_index = ref("")
const image_urls: Ref<Array<string>> = ref([])

const get_list_img = async () => {
    try {
        const response = await fetch(url_image_list)
        const data = await response.json()
        image_index.value = data
        for (let pack in data) {
            for (let i in data[pack]) {
                image_urls.value.push(url_image + pack + "/" + data[pack][i])
            }
        }
    } catch (error) {
        console.error(error)
    }
}

</script>
<style lang="scss" scoped>
div.dev-box {
    height: 100vh;
    width: 100vw;
    margin-left: 150px;
    border: solid 1px red;
}
</style>