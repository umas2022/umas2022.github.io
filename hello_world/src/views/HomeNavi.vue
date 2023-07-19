<template>
    <div class="body-navi">

        <!-- <el-button style="z-index: 99;" type="danger" @click=test_button> test</el-button> -->

        <!-- 左侧导航按钮:返回home -->
        <div class="home-box navi-box">
            <div class="home-icon navi-icon" @click="go_home">
                <img width="36" height="36" src="icon/home.svg" alt="icon">
            </div>

            <el-scrollbar style="height: calc(100% - 55px)">
                <div class="navi-body">
                    <h3>返回主页</h3>
                </div>
            </el-scrollbar>
        </div>

        <!-- 左侧导航按钮:开发页 -->
        <div class="home-box navi-box" v-if="store.state.setval.isdev">
            <div class="home-icon navi-icon" @click="go_dev">
                <img width="36" height="36" src="icon/toilet.svg" alt="icon">
            </div>

            <el-scrollbar style="height: calc(100% - 55px)">
                <div class="navi-body">
                    <h3>去开发页</h3>
                </div>
            </el-scrollbar>
        </div>

        <!-- 左侧导航按钮:弔图列表 -->
        <div class="list-box navi-box">
            <div class="list-icon navi-icon">
                <img width="36" height="36" src="icon/image.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 55px)">
                <div class="navi-body">
                    <h3>弔图存档</h3>
                    <div class="navi-each pointer" v-for="index in img_total" :key="index"
                        @click="change_img_group('image', index)">
                        第{{ img_total + 1 - index }}期
                        <img width="10" height="10" src="icon/right.svg" alt="icon">
                    </div>
                </div>
            </el-scrollbar>
        </div>


        <!-- 左侧导航按钮:表情包列表 -->
        <div class="sticker-box navi-box">
            <div class="sticker-icon navi-icon">
                <img width="36" height="36" src="icon/sticker.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 50px)">
                <div class="navi-body">
                    <h3>表情包存档</h3>
                    <div class="navi-each pointer" v-for="index in stk_total" :key="index"
                        @click="change_img_group('sticker', index)">
                        第{{ stk_total + 1 - index }}期
                        <img width="10" height="10" src="icon/right.svg" alt="icon">
                    </div>
                </div>
            </el-scrollbar>
        </div>


        <!-- 左侧导航按钮:视频列表 -->
        <div class="video-box navi-box">
            <div class="video-icon navi-icon">
                <img width="36" height="36" src="icon/video.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 50px)">
                <div class="navi-body">
                    <h3>视频存档</h3>
                    <div class="navi-each pointer" v-for="index in vid_total" :key="index"
                        @click="change_img_group('video', index)">
                        第{{ vid_total + 1 - index }}期
                        <img width="10" height="10" src="icon/right.svg" alt="icon">
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- 左侧导航按钮:设置 -->
        <div class="set-box navi-box">
            <div class="set-icon navi-icon">
                <img width="36" height="36" src="icon/setting.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 60px)">
                <div class="navi-body">
                    <h3>设置</h3>
                    <div class="navi-each">
                        图片宽度 <br>
                        <el-slider v-model="set_pic_width" :max="90" :min="20" @input="slider_pic_width()" />
                    </div>
                    <div class="navi-each">
                        显示tag <br>
                        <el-switch v-model="store.state.setval.show_tag" style="margin-left: 70px;" />
                    </div>
                    <div class="navi-each">
                        编辑tag <br>
                        <el-switch v-model="store.state.setval.edit_tag"
                            @click="store.state.setval.right_navi = store.state.setval.edit_tag" style="margin-left: 70px;">
                        </el-switch> <br>
                    </div>
                    <div class="navi-each">
                        右侧tag栏 <br>
                        <el-switch v-model="store.state.setval.right_navi" style="margin-left: 70px;"> </el-switch> <br>
                    </div>

                    <div class="navi-each">
                        开发模式 <br>
                        <el-switch v-model="store.state.setval.isdev" style="margin-left: 70px;" />
                    </div>
                    <div class="navi-each">
                        夜间模式 <br>
                        (开发中)
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- 左侧导航按钮:信息 -->
        <div class="info-box navi-box">
            <div class="info-icon navi-icon">
                <img width="36" height="36" src="icon/magic.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 50px)">
                <div class="navi-body">
                    <h3>About</h3>
                    <div class="navi-each"> by:umas </div>
                    <div class="navi-each">visit: <a href="https://github.com/umas2022/umas2022.github.io">GitHub</a>
                    </div>
                    <div class="navi-each"> <li>左右方向键可以控制翻页</li>  </div>
                    <div class="navi-each"> <li>找不到tag？可以ctrl+F直接搜网页</li>  </div>
                    <div class="navi-each"> <li>直接搜索空字符串会返回所有表情包</li> </div>
                    <div class="navi-each"> <li>支持在结果中继续搜索</li> </div>
                    <div class="navi-each"> <li>（没有做竖屏适配）</li> </div>
                </div>
            </el-scrollbar>
        </div>

        <!-- 左侧导航按钮:更新日历 -->
        <div class="calen-box navi-box">
            <div class="calen-icon navi-icon">
                <img width="36" height="36" src="icon/info.svg" alt="icon">
            </div>
            <el-scrollbar style="height: calc(100% - 50px)">
                <div class="navi-body">
                    <h3>更新记录</h3>

                    <div class="navi-each" v-for="(item, index) in update_index" :key="index">
                        <li> {{ item }}</li>
                    </div>
                </div>
            </el-scrollbar>
        </div>



    </div>
</template>
  
<script lang="ts" setup>
import { ref, inject, computed } from "vue"
import type { Ref } from "vue"
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();
import { pack_name } from "@/utils/tools.js"

const image_urls: Ref<any> = inject("image_urls")!
const sticker_urls: Ref<any> = inject("sticker_urls")!
const video_urls: Ref<any> = inject("video_urls")!
const update_index: Ref<any> = inject("update_index")!

const img_total = computed(() => Object.keys(image_urls.value).length)
const stk_total = computed(() => Object.keys(sticker_urls.value).length)
const vid_total = computed(() => Object.keys(video_urls.value).length)

// 返回主页
const go_home = () => {
    router.push("search")
}

// 去开发页
const go_dev = () => {
    router.push("dev")
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
    } else if (group == "video") {
        show_list.list = video_urls.value[pack_name(num)]
        show_list.path = show_list.list
    }
    return show_list
}

// 切换图片组
const change_img_group = (group: string, num: number) => {
    if (group == "image") {
        store.commit("set_list", set_show_list(group, img_total.value + 1 - num, "第" + JSON.stringify(img_total.value + 1 - num) + "期"))
    } else if (group == "sticker") {
        store.commit("set_list", set_show_list(group, stk_total.value + 1 - num, "第" + JSON.stringify(stk_total.value + 1 - num) + "期"))
    } else if (group == "video") {
        store.commit("set_list", set_show_list(group, vid_total.value + 1 - num, "第" + JSON.stringify(vid_total.value + 1 - num) + "期"))
    }
    router.push("show")
}

// 设置参数
const set_pic_width = ref(store.state.setval.pic_width)
const slider_pic_width = () => {
    store.commit("set_set", { key: "pic_width", value: set_pic_width.value })
}



// 测试按钮
const test_button = () => {
    console.log(image_urls)
}


</script>
  
<style scoped lang="scss">
div.body-navi {
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-out;
}

div.navi-box {
    // height: 40px;
    width: 40px;
    border-radius: 5px;
    transition: 0.3s ease-out;
    padding: 5px 15px 5px 5px;
    border: solid 2px rgba(0, 0, 0, 0);
    display: inline-block;

    z-index: 99;
    margin: 3px;
}


// 左侧导航展开宽度，另外需要改变HomeIndex.vue, div.body-navi:hover~div.body-center 
div.navi-box:hover {
    width: 400px;
    border: solid 2px rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.3);
}


div.navi-icon {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: solid 2px rgba(0, 0, 0, 1);
    transition: transform 0.7s ease-in-out;
    cursor: pointer;

    z-index: 3;
    display: inline-block;
}

div.navi-icon:hover {
    transform: rotate(360deg);
}

div.navi-body {
    padding: 10px;
    height: auto;
}

div.navi-body h3 {
    padding-left: 50px;
}

div.navi-each {
    border-radius: 5px;
    border: solid 2px rgba(0, 0, 0, 1);
    margin: 5px;
    margin-left: 50px;
    padding: 5px 15px 5px 15px;
    background-color: rgba(255, 255, 255, 0.3);
}


/* 返回home */
div.home-icon {
    padding: 3px 1px 1px 3px;
}

div.home-box {
    height: 40px;
}

div.home-box:hover {
    width: 300px;
    border: solid 2px rgba(0, 0, 0, 0.7);
    height: 150px;
}

/* 弔图列表栏 */
div.list-box {
    height: 40px;
}

div.list-box:hover {
    height: calc(100vh - 400px);
}

div.list-icon {
    padding: 3px 0px 1px 4px;
}


/* 表情包列表栏 */
div.sticker-box {
    height: 40px;
    max-height: calc(100vh - 400px);
}

div.sticker-box:hover {
    height: calc(100vh - 300px);
}

div.sticker-icon {
    padding: 4px 1px 0px 3px;
}

/* 视频列表栏 */
div.video-box {
    height: 40px;
    max-height: calc(100vh - 400px);
}

div.video-box:hover {
    height: calc(100vh - 300px);
}

div.video-icon {
    padding: 4px 1px 0px 3px;
}


/* 设置栏 */
div.set-box {
    height: 40px;
    max-height: calc(100vh - 400px);
}

div.set-box:hover {
    height: calc(100vh - 300px);
}

div.set-icon {
    padding: 4px 0px 0px 4px;
}

/* 信息栏 */
div.info-box {
    height: 40px;
    max-height: calc(100vh - 400px);
}

div.info-box:hover {
    height: calc(100vh - 300px);
}

div.info-icon {
    padding: 4px 0px 0px 4px;
}

/* 更新栏 */
div.calen-box {
    height: 40px;
    max-height: calc(100vh - 400px);
}

div.calen-box:hover {
    height: calc(100vh - 300px);
}

div.calen-icon {
    padding: 4px 0px 0px 4px;
}
</style>