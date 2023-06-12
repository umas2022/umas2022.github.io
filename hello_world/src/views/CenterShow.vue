<template>
    <div>
        <!-- <h1>show施工中</h1>
        <el-button type="danger" @click=test_button> test</el-button> -->

        <el-button v-if="store.state.setval.edit_tag" type="primary" plain @click="save_tag_edit"
            style="margin-left: 50px;">导出修改</el-button>


            <h1 style="text-align: center;">{{props.show_list.title}}</h1>
        <!-- 图片显示 -->
        <div class="img-each" v-for="(img_name, index) in props.show_list.list" :key="index"
            :style="{ width: store.state.setval.pic_width + '%' }">
            <div class="img-title">No.{{ index + 1 }} ({{ props.show_list.path[index] }})</div>
            <img style="width: 100%;" :src="props.show_list.path[index]" alt="">

            <!-- tag栏 -->
            <div class="tag-box" v-if="store.state.setval.show_tag" v-show="!store.state.setval.edit_tag">
                <el-tag v-for="(tag, index) in get_tag_list_re(img_name)" :key="index">{{ tag }}</el-tag>
            </div>

            <div class="tag-box" v-if="store.state.setval.edit_tag">
                <el-tag type="success" v-for="(tag, id) in get_tag_list_re(img_name)" closable :disable-transitions="false"
                    :key="id" @close="handle_tag_del(index, tag)">{{ tag }}</el-tag>

                <el-tag v-if="!show_tag_add[index]" size="small" @click="show_input(index)" style="cursor: pointer;">
                    + New Tag
                </el-tag>
                <el-input v-else v-model="tag_new" size="small" @keyup.enter="handle_tag_add(index)" style="width: 100px;">
                </el-input>
                <el-tag v-if="show_tag_add[index]" size="small" @click="handle_tag_add(index)" style="cursor: pointer;">
                    √
                </el-tag>
            </div>
        </div>

        <!-- 上一页/下一页 -->
        <div class="rear-box">
            <el-button @click=page_pre>上一页</el-button>
            <el-button @click=page_next>下一页</el-button>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch, nextTick, Ref } from "vue";
import { ElMessage } from 'element-plus'
import { ElInput } from 'element-plus'

import { pack_name, get_tag_list, build_suggestions, set_show_list } from "@/utils/tools.js"
import { useStore } from "vuex";
const store = useStore();

import image_list_json from "@/assets/list/image_list.json"
import sticker_list_json from "@/assets/list/sticker_list.json"
const image_list: { [key: string]: any } = image_list_json
const sticker_list: { [key: string]: any } = sticker_list_json
const img_total = Object.keys(image_list).length
const stk_total = Object.keys(sticker_list).length

// 父组件传参
const props = defineProps<{
    show_list: {
        title: string,
        list: string[],
        path: string[]
    }
}>();


// tag列表rebuild
const get_tag_list_re = (name: string) => {
    if (tag_edit.value[name]) {
        name = tag_edit.value[name]
    }
    return get_tag_list(name)
}

// 显示新增tag
const show_tag_add = ref(Array(100).fill(0))
// 新增tag
const tag_new = ref("")


// 编辑列表
const tag_edit: { [key: string]: any } = ref({})
const path_edit: { [key: string]: any } = ref({})


// 显示tag输入框
const show_input = (index: number) => {
    show_tag_add.value = new Array(100).fill(0)
    show_tag_add.value[index] = 1
    tag_new.value = ""
}
watch(() => store.state.tag_navi,
    () => { tag_new.value = store.state.tag_navi })

// 新增tag
const handle_tag_add = (index: number) => {
    show_tag_add.value[index] = 0

    let name_old = props.show_list.list[index]
    let suffix = name_old.split(".")[name_old.split(".").length - 1]
    let num = name_old.split("." + suffix)[0].split("_")[0]

    let tag_list = get_tag_list_re(name_old)
    if (tag_new.value == "") {
        return
    }
    tag_list.push(tag_new.value)
    let name_new = num + "_" + tag_list.join("_") + "." + suffix
    tag_edit.value[name_old] = name_new

    tag_new.value = ""

    let path_old = props.show_list.path[index]
    let path_new = path_old.replace(name_old, name_new)
    path_edit.value[path_old] = path_new
}
// 删除tag
const handle_tag_del = (index: number, tag: string) => {

    let name_old = props.show_list.list[index]
    let num = name_old.split("_")[0]
    let suffix = name_old.split(".")[name_old.split(".").length - 1]
    let tag_list = get_tag_list_re(name_old)
    tag_list = tag_list.filter((item: string) => item != tag)
    let name_new = num + "_" + tag_list.join("_") + "." + suffix
    tag_edit.value[name_old] = name_new

    let path_old = props.show_list.path[index]
    let path_new = path_old.replace(name_old, name_new)
    path_edit.value[path_old] = path_new
}

// 保存tag修改
const save_tag_edit = () => {
    const data = JSON.stringify(path_edit.value);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edit.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// 下一页/上一页
const page_pre = () => {
    let group = props.show_list.path[0].split("/")[0]
    let pack_num = parseInt(props.show_list.path[0].split("/")[1].replace("pack", ""))
    if (pack_num == 1) {
        ElMessage.success("到头啦!")
        return
    }
    store.commit("set_list", set_show_list(group, pack_num - 1))
}
const page_next = () => {
    let group = props.show_list.path[0].split("/")[0]
    let pack_num = parseInt(props.show_list.path[0].split("/")[1].replace("pack", ""))
    let max = group == "image" ? img_total : stk_total
    if (pack_num == max) {
        ElMessage.success("到头啦!")
        return
    }
    store.commit("set_list", set_show_list(group, pack_num + 1))
}


// test按钮
const test_button = () => {
    console.log("test")
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
}

// 下一页
div.rear-box {
    margin: 0 auto;
    text-align: center
}
</style>