<template>
    <div>
        <!-- <h1>show施工中</h1>
        <el-button type="danger" @click=test_button> test</el-button> -->

        <el-button v-if="store.state.setval.edit_tag" type="primary" plain @click="save_tag_edit"
            style="margin-left: 50px;">导出修改</el-button>


        <h1 style="text-align: center;">{{ props.show_list.title }}</h1>
        <!-- 图片显示 -->
        <div class="img-each" v-for="(img_name, index) in props.show_list.list" :key="index"
            :style="{ width: store.state.setval.pic_width + '%' }">
            <div class="img-title">No.{{ index + 1 }}
                ({{ props.show_list.path[index].split("/")[props.show_list.path[index].split("/").length - 2] }} /
                {{ props.show_list.path[index].split("/")[props.show_list.path[index].split("/").length - 1] }})
            </div>
            <video v-if="url_type(props.show_list.path[index]) == 'video'" controls>
                <source :src="props.show_list.path[index]" type="video/mp4">
                <source :src="props.show_list.path[index]" type="video/webm">
            </video>
            <img v-else-if="url_type(props.show_list.path[index]) == 'image'" :src="props.show_list.path[index]">
            <span v-else> Video format is not supported: {{ props.show_list.path[index] }}</span>


            <!-- tag栏 -->
            <div class="tag-box" v-if="store.state.setval.show_tag" v-show="!store.state.setval.edit_tag">
                <div class="tag-each" v-for="(tag, index) in get_tag_list_re(img_name)" :key="index">
                    <my-tag>{{ tag }}</my-tag>
                </div>
            </div>

            <div class="tag-box" v-if="store.state.setval.edit_tag">
                <el-tag type="success" v-for="(tag, id) in get_tag_list_re(img_name)" closable :disable-transitions="false"
                    :key="id" @close="handle_tag_del(index, tag)">{{ tag }}
                </el-tag>

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
import { defineProps, ref, watch, computed, inject } from "vue";
import type { Ref } from "vue"
import { useStore } from "vuex";
const store = useStore();
import { ElMessage } from 'element-plus'
import { ElInput } from 'element-plus'

import MyTag from "@/components/MyTag.vue"
import { pack_name } from "@/utils/tools.js"
import { get_tag_list } from "@/utils/tools.js"
import { url_type } from "@/utils/tools.js"


const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const tag_index: Ref<any> = inject("tag_index")!
const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)

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
    // 因为使用网络路径，第一位拆分出了一部分路径字符串，所以舍弃
    return get_tag_list(name).slice(1)
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
    let max = group == "image" ? img_total.value : stk_total.value
    if (pack_num == max) {
        ElMessage.success("到头啦!")
        return
    }
    store.commit("set_list", set_show_list(group, pack_num + 1, "第" + JSON.stringify(pack_num - 1) + "期"))
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


// 下一页
div.rear-box {
    margin: 0 auto;
    text-align: center
}
</style>