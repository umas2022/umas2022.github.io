<template>
    <div>
        <el-button type="danger" @click=test_button> test</el-button>


    


        <h1 style="text-align: center;">{{ props.show_list.title }}</h1>
        <!-- 图片显示 -->
        <div class="img-each" v-for="(img_name, index) in props.show_list.list" :key="index"
            :style="{ width: store.state.setval.pic_width + '%' }">

            <ShowImage
                :title="'No.' + index + 1 + '(' + props.show_list.path[index].split('/')[props.show_list.path[index].split('/').length - 2] + '/' + props.show_list.path[index].split('/')[props.show_list.path[index].split('/').length - 1] + ')'"
                :path="props.show_list.path[index]">
            </ShowImage>

        </div>

        <!-- 上一页/下一页 -->
        <div class="rear-box">
            <el-button @click=page_pre>上一页</el-button>
            <el-button @click=page_next>下一页</el-button>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch, computed, inject, nextTick } from "vue";
import type { Ref } from "vue"
import { useStore } from "vuex";
const store = useStore();
import { ElMessage } from 'element-plus'
// import { ElInput } from 'element-plus'

import MyTag from "@/components/MyTag.vue"
import ButtonCross from "@/components/ButtonCross.vue"
import ShowImage from "@/components/ShowImage.vue"
import { pack_name } from "@/utils/tools.js"
import { get_tag_list } from "@/utils/tools.js"


const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const tag_index: Ref<any> = inject("tag_index")!
const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)
const vid_total = computed(() => Object.keys(video_urls.value).length)

// 父组件传参
const props = defineProps<{
    show_list: {
        title: string,
        list: string[],
        path: string[]
    }
}>();












// 图片组格式化生成函数
const set_show_list = (group: string, num: number, title: string) => {
    const show_list = {
        title: title,
        list: [],
        path: []
    }
    if (group == "image") {
        show_list.list = image_urls.value[pack_name(num)]
        show_list.path = show_list.list
    } else if (group == "sticker") {
        show_list.list = sticker_urls.value[pack_name(num)]
        show_list.path = show_list.list
    }
    return show_list
}


// 下一页/上一页
const page_pre = () => {
    let group = props.show_list.path[0].split("/")[props.show_list.path[0].split("/").length - 3]
    let pack_name = props.show_list.path[0].split("/")[props.show_list.path[0].split("/").length - 2]
    let pack_num = parseInt(pack_name.replace("pack", ""))
    if (pack_num == 1) {
        ElMessage.success("到头啦!")
        return
    }
    store.commit("set_list", set_show_list(group, pack_num - 1, "第" + JSON.stringify(pack_num - 1) + "期"))
}
const page_next = () => {
    let group = props.show_list.path[0].split("/")[props.show_list.path[0].split("/").length - 3]
    let pack_name = props.show_list.path[0].split("/")[props.show_list.path[0].split("/").length - 2]
    let pack_num = parseInt(pack_name.replace("pack", ""))
    let max = group == "image" ? img_total.value : group == "sticker" ? stk_total.value : vid_total.value
    if (pack_num == max) {
        ElMessage.success("到头啦!")
        return
    }
    store.commit("set_list", set_show_list(group, pack_num + 1, "第" + JSON.stringify(pack_num - 1) + "期"))
}


// test按钮
const test_button = () => {
    console.log("test")
    console.log(store.state.edit_list)
}

</script>


<style lang="scss" scoped>
div.img-box {
    text-align: center;
    width: 100%;
    height: 100%;
    transition: 0.3s ease-out;
}

div.img-each {
    border-radius: 5px;
    border: solid 2px rgba(0, 0, 0, 0.5);
    margin: auto;
    margin-bottom: 15px;
    padding: 15px;

    img {
        width: 100%;
    }

    video {
        width: 100%;
    }
}




// 下一页
div.rear-box {
    margin: 0 auto;
    text-align: center
}
</style>