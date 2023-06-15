<template>
<el-input ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" />
            <el-button class="button-new-tag ml-1" size="small" @click="showInput">
                + New Tag
            </el-button>
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
    show_list: {
        title: string,
        list: string[],
        path: string[]
    }
}>();


// 选中编辑的图片
const edit_selected: Ref<number> = ref(-1)
const edit_this = (index: number) => {
    edit_selected.value = index
}


// tag列表rebuild
const get_tag_list_re = (name: string) => {
    if (tag_edit.value[name]) {
        name = tag_edit.value[name]
    }
    // 因为使用网络路径，第一位拆分出了一部分路径字符串，所以舍弃
    return get_tag_list(name).slice(1)
}


// 显示tag输入框
const show_input = ref(false)
// 新增tag
const tag_new = ref("")


// 点击添加新标签按钮
// const InputRef = ref<InstanceType<typeof ElInput>>()
const InputRef = ref<any>()
const add_new_tag = () => {
    show_input.value = true
    console.log(InputRef.value)

    nextTick(() => {
        InputRef.value!.input!.focus()
    })

}


// 删除tag
const handle_tag_del = (tag: string) => {

    // let name_old = props.show_list.list[index]
    // let num = name_old.split("_")[0]
    // let suffix = name_old.split(".")[name_old.split(".").length - 1]
    // let tag_list = get_tag_list_re(name_old)
    // tag_list = tag_list.filter((item: string) => item != tag)
    // let name_new = num + "_" + tag_list.join("_") + "." + suffix
    // tag_edit.value[name_old] = name_new

    // let path_old = props.show_list.path[index]
    // let path_new = path_old.replace(name_old, name_new)
    // path_edit.value[path_old] = path_new

    console.log(tag)
}


// 新增tag
const handle_tag_add = () => {


    // show_tag_add.value[index] = 0

    // let name_old = props.show_list.list[index]
    // let suffix = name_old.split(".")[name_old.split(".").length - 1]
    // let num = name_old.split("." + suffix)[0].split("_")[0]

    // let tag_list = get_tag_list_re(name_old)
    // if (tag_new.value == "") {
    //     return
    // }
    // tag_list.push(tag_new.value)
    // let name_new = num + "_" + tag_list.join("_") + "." + suffix
    // tag_edit.value[name_old] = name_new

    // tag_new.value = ""

    // let path_old = props.show_list.path[index]
    // let path_new = path_old.replace(name_old, name_new)
    // path_edit.value[path_old] = path_new
}



const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}
const inputValue = ref('')
const inputVisible = ref(false)






// 显示新增tag
const show_tag_add = ref(false)

// 编辑列表
const tag_edit: { [key: string]: any } = ref({})
const path_edit: { [key: string]: any } = ref({})


watch(() => store.state.tag_navi,
    () => { tag_new.value = store.state.tag_navi })




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
    console.log(props.show_list)
}

  </script>
  