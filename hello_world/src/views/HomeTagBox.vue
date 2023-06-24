<template>
    <div>
        <!-- 右侧tag快捷栏 -->
        <div class="body-add-tag">
            <el-button style="width: calc(100% - 6px);margin: 3px;" v-if="store.state.setval.edit_tag" type="danger" plain @click="save_tag_edit">导出修改</el-button>

            <el-scrollbar>
                <div class="tag-list">
                    <div class="tag-each shake-little" v-for="(tag, index) in tag_index" :key="index">
                        <my-tag v-if="tag_sep.includes(tag)" type="danger" :hover="true">{{ tag }}</my-tag>
                        <my-tag v-else @click="set_tag_navi(tag)" :hover="true">{{ tag }}</my-tag>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, computed, watch } from "vue"
import type { Ref } from "vue"
import { useStore } from "vuex";
const store = useStore();
import MyTag from "@/components/MyTag.vue"
import { tag_sep } from "@/utils/const.js"
import { ElMessage } from "element-plus";

const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const tag_index: Ref<any> = inject("tag_index")!
const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)

// 点击tag
const set_tag_navi = (tag: string) => {
    store.commit("set_tag", "")
    setTimeout(() => {
        store.commit("set_tag", tag)
    }, 100);
    console.log(store.state.tag_navi)
}


// 保存tag修改
const save_tag_edit = () => {
    const data = JSON.stringify(store.state.edit_list);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edit.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



// test按钮
const test_button = () => {
    console.log("test")
}
</script>

<style lang="scss" scoped>
my-tag {
    cursor: pointer;
}

/* 右侧tag快捷栏 */
div.body-add-tag {
    border-radius: 5px;
    width: calc(100% - 5px);
    height: 100%;
    z-index: 4;
    right: 0;
    background-color: rgba(255, 255, 255, 0.5);
    transition: 0.3s ease-out;
    border: solid 2px rgba(0, 0, 0, 0.5);

    div.tag-each {
        padding: 2px;
        cursor: pointer;
    }
}


div.body-add-tag .tag-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
}
</style>