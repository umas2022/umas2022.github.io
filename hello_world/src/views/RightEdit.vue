<template>
    <div>
        <!-- 右侧tag快捷栏 -->
        <div class="body-add-tag">
            <el-scrollbar>
                <div class="tag-list">
                    <div class="tag-each shake-horizontal" v-for="(tag, index) in tag_list_bookmark()" :key="index">
                        <el-tag type="danger" v-if="bootmark_reverse[tag]">{{ bootmark_reverse[tag] }}</el-tag>
                        <el-tag v-else @click="set_tag_navi(tag)">{{ tag }}</el-tag>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { tag_list_bookmark } from "@/utils/tools.js"
import { bootmark_reverse } from "@/utils/bookmark.js"
import { useStore } from "vuex";
const store = useStore();

// 点击tag
const set_tag_navi = (tag: string) => {
    store.commit("set_tag", "")
    setTimeout(() => {
       store.commit("set_tag", tag) 
    }, 10);
    console.log(store.state.tag_navi)
}


// test按钮
const test_button = () => {
    console.log("test")
}
</script>

<style lang="scss" scoped>
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