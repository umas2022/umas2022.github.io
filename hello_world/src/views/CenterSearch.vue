<template>
    <div>

        <div class="search-box">

            <el-button type="danger" @click=test_button> test</el-button>


            <div class="img-box " v-if="res_list.length == 1">
                <img class="shake-crazy" style="width: 30%;" src="static/home.jpg" alt="">
            </div>
            <div class="input-box">
                <el-input placeholder="搜tag" v-model="search_input"></el-input>
                <el-button @click="search_tag">搜索</el-button>
                <el-button @click="res_list.pop()" v-if="res_list.length > 1">返回</el-button>
            </div>

            <div class="tag-box" v-if="res_list.length == 1">
                <!-- <div class="tag-each shake-horizontal" v-for="(tag, index) in tag_list_bookmark()" :key="index">
                    <my-tag type="danger" v-if="bootmark_reverse[tag]">{{ bootmark_reverse[tag] }}</my-tag>
                    <my-tag v-else @click="search_input = tag">{{ tag }}</my-tag>
                </div> -->
                <div class="tag-each shake-horizontal" v-for="(tag, index) in tag_index" :key="index">
                    <my-tag @click="search_input = tag">{{ tag }}</my-tag>
                </div>
            </div>


            <div class="res-box" v-if="res_list.length > 1">
                <CenterShow :show_list="res_list[res_list.length - 1]" />
            </div>
        </div>



    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, computed } from "vue"
import type { Ref } from "vue"
import { set_show_list, pack_name } from "@/utils/tools.js"

import MyTag from "@/components/MyTag.vue"


const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const tag_index: Ref<any> = inject("tag_index")!
const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)

import { useStore } from "vuex";
const store = useStore();

import CenterShow from "./CenterShow.vue"



// 跳转最新
const go_img = () => {
    store.commit("set_list", set_show_list("image", img_total.value, "第" + JSON.stringify(img_total.value) + "期"))
    store.commit("set_page", "show")
}
const go_stk = () => {
    store.commit("set_list", set_show_list("sticker", stk_total.value, "第" + JSON.stringify(img_total.value) + "期"))
    store.commit("set_page", "show")
}


// 搜索输入
const search_input = ref("")


// 搜索结果拼接函数
const add_search_list = (show_list: { title: string, list: string[], path: string[] }, pack_num: number | string, stk_name: string) => {
    show_list.list.push(stk_name)
    show_list.path.push("sticker/" + pack_name(pack_num) + "/" + stk_name)
    return show_list
}

// 搜索记录列表
const res_list = ref<{ title: string, list: string[], path: string[] }[]>([])
onMounted(() => {
    res_list.value = []
    res_list.value[0] = { title: "搜索结果", list: [], path: [] }
    for (let pack in sticker_urls) {
        for (let id in sticker_urls.value[pack]) {
            res_list.value[0] = add_search_list(res_list.value[0], pack, sticker_urls.value[pack][id])
        }
    }
})

// 搜索tag
const search_tag = () => {

    res_list.value.push({ title: "搜索结果", list: [], path: [] })
    for (let id in res_list.value[res_list.value.length - 2].list) {
        let stk = res_list.value[res_list.value.length - 2].list[id]
        let path = res_list.value[res_list.value.length - 2].path[id]
        if (stk.includes(search_input.value)) {
            res_list.value[res_list.value.length - 1].list.push(stk)
            res_list.value[res_list.value.length - 1].path.push(path)
        }
    }
    console.log(res_list.value)
}

// test按钮
const test_button = () => {
    console.log("test")
    console.log(tag_index.value)
}
</script>

<style lang="scss" scoped>
div.search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
    padding-bottom: 100px;
}

div.search-box .img-box {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        padding: 5px;
        border: solid 3px black;
        border-radius: 5px;
    }

}

div.search-box .input-box {
    width: 30%;
    padding: 5px;
    display: flex;
    border: solid 3px black;
    border-radius: 5px;
    margin: 5px 0 5px 0;
}

// div.go-box{
//     display: flex;
//     position: relative;
//     justify-content: center;
//     align-items: center;
// }


/* 自定义搜索框 */
div.el-autocomplete div.el-input {
    height: 40px;
    width: 100%;
}

/* tag展示区 */
div.tag-box {
    width: 80%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
}

div.tag-each {
    padding: 3px;
}

div.tag-each .el-tag {
    cursor: pointer;
}
</style>