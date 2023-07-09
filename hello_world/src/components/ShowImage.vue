<template>
    <!-- 显示单张图片或单个视频 -->

    <div class="cp-image">

        <!-- <el-button type="danger" @click="test_button"> test1</el-button> -->

        <!-- 标题 -->
        <div class="img-title">{{ props.title }} </div>

        <!-- 编辑tag模式下显示tooltip -->
        <el-tooltip v-if="store.state.setval.edit_tag" effect="dark" :content="edit_mode ? '点击锁定tag修改' : '点击激活tag修改'"
            placement="top-start">
            <video style="cursor: pointer;" @click="edit_mode = !edit_mode" v-if="url_type(props.path) == 'video'" controls>
                <source :src="props.path" type="video/mp4">
                <source :src="props.path" type="video/webm">
            </video>
            <img style="cursor: pointer;" @click="edit_mode = !edit_mode" v-else-if="url_type(props.path) == 'image'"
                :src="props.path">
            <span v-else> Video format is not supported: {{ props.path }}</span>
        </el-tooltip>

        <!-- 一般状态显示 -->
        <div v-else>
            <video v-if="url_type(props.path) == 'video'" controls>
                <source :src="props.path" type="video/mp4">
                <source :src="props.path" type="video/webm">
            </video>
            <img v-else-if="url_type(props.path) == 'image'" :src="props.path">
            <span v-else> Video format is not supported: {{ props.path }}</span>
        </div>

        <!-- tag栏 -->
        <div class="tag-box" v-show="store.state.setval.show_tag" v-if="!edit_mode">
            <div class="tag-each" v-for="(tag, index) in get_tag_list_edit(img_name)" :key="index">
                <my-tag>{{ tag }}</my-tag>
            </div>
        </div>

        <!-- 编辑tag -->

        <div class="tag-box" v-else>
            <my-tag v-for="(tag, index) in get_tag_list_edit(img_name)" :key="index" :hover="false">
                {{ tag }}
                <button-cross @click="handle_tag_del(tag)"></button-cross>
            </my-tag>

            <my-tag v-if="!input_mode" @click="set_input" style="cursor: pointer;" :hover="true">
                + Add New Tag +
            </my-tag>


            <my-tag v-else>
                <el-input ref="InputRef" v-model="tag_new" size="small" @keyup.enter="handle_tag_add()"
                    style="width: 100px;">
                </el-input>
                <el-button size="small" @click="handle_tag_add()" style="cursor: pointer;" :hover="true">
                    确定
                </el-button>
            </my-tag>

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
import { pack_name } from "@/utils/tools.js"
import { get_tag_list } from "@/utils/tools.js"
import { url_type } from "@/utils/tools.js"

const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const tag_index: Ref<any> = inject("tag_index")!
const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)
const vid_total = computed(() => Object.keys(video_urls.value).length)


// 父组件传参
const props = defineProps<{
    title: string,
    path: string
}>();
const img_name = computed(() => props.path.split('/')[props.path.split('/').length - 1])

// 启用编辑模式
const edit_mode = ref(false)
// 启用文本输入
const input_mode = ref(false)


// 渲染修改后的tag
const tag_edit: { [key: string]: any } = ref({})
const get_tag_list_edit = (name: string) => {
    if (tag_edit.value[name]) {
        name = tag_edit.value[name]
    }
    return get_tag_list(name)
}


// 函数：删除tag
const handle_tag_del = (tag: string) => {

    let name_old = img_name.value
    let num = name_old.split("_")[0]
    let suffix = name_old.split(".")[name_old.split(".").length - 1]
    let tag_list = get_tag_list_edit(name_old)

    tag_list = tag_list.filter((item: string) => item != tag)
    let name_new = num + "_" + tag_list.join("_") + "." + suffix
    tag_edit.value[name_old] = name_new

    let path_old = props.path
    let path_new = path_old.replace(name_old, name_new)
    store.state.edit_list.push({ path_old: path_old, path_new: path_new })
}


// 函数：启用输入模式
const InputRef = ref<any>()
const set_input = () => {
    input_mode.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

// 函数：新增tag
const tag_new = ref("")
const handle_tag_add = () => {
    input_mode.value = false

    let name_old = img_name.value
    let num = name_old.split(".")[0].split("_")[0]
    console.log(num)
    let suffix = name_old.split(".")[name_old.split(".").length - 1]
    let tag_list = get_tag_list_edit(name_old)

    if (tag_new.value == "") {
        return
    }
    tag_list.push(tag_new.value)
    tag_new.value = ""

    let name_new = num + "_" + tag_list.join("_") + "." + suffix
    tag_edit.value[name_old] = name_new


    let path_old = props.path
    let path_new = path_old.replace(name_old, name_new)
    store.state.edit_list.push({ path_old: path_old, path_new: path_new })
}


// 由右侧快捷栏新增tag
watch(() => store.state.tag_navi, () => {
    tag_new.value = store.state.tag_navi
})


// 测试按钮
const test_button = () => {
    console.log(props.path)
    console.log(img_name.value)
}
</script>


<style lang="scss" scoped>
div.cp-image {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
    }

    video {
        width: 100%;
    }
}

div.tag-box {
    width: 80%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;

    .tag-each {
        padding: 3px;
    }
}
</style>