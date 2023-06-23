<template>
  <div class="home">

    <!-- <el-button style="z-index: 99;" type="danger" @click=test_button> test</el-button> -->

    <!-- 背景图x10 -->
    <div class="bg-box">
      <div class="bg-one" v-for="i in 10" :key="i">
        <img class="bg-img" :src=bg_path alt="">
      </div>
    </div>

    <!-- 左侧导航 -->
    <div class="body-navi">
      <LeftNavi />
    </div>



    <div class="body-center">

      <!-- 中间loading页,强制loading -->
      <div class="body-loading" v-if="store.state.center_page == 'loading'">
        <LoadingPage />
      </div>

      <!-- 中间loading页,初始化loading -->
      <div class="body-loading" v-else-if="image_index == '' || sticker_index == '' || video_index == ''">
        <LoadingPage />
      </div>

      <!-- 中间开发页 -->
      <el-scrollbar v-else-if="store.state.center_page == 'dev'">
        <DevPage />
      </el-scrollbar>

      <!-- 中间首页搜索 -->
      <el-scrollbar class="body-search" v-else-if="store.state.center_page == 'search'">
        <keep-alive>
          <CenterSearch />
        </keep-alive>
      </el-scrollbar>

      <!-- 中间图片显示 -->
      <el-scrollbar class="body-main" v-else-if="store.state.center_page == 'show'" :style="{ width: width_show }">
        <keep-alive>
        <CenterShow :show_list="store.state.show_list" />
      </keep-alive>
      </el-scrollbar>

      <!-- 右侧tag显示 -->
      <el-scrollbar class="body-tag" v-if="store.state.setval.right_navi" :style="{ width: width_tag }">
        <RightEdit />
      </el-scrollbar>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, provide } from "vue";
import type { Ref } from "vue"
import LoadingPage from "@/components/LoadingPage.vue"
import DevPage from "@/components/DevPage.vue"
import LeftNavi from "./LeftNavi.vue"
import CenterShow from "./CenterShow.vue"
import CenterSearch from "./CenterSearch.vue"
import RightEdit from "./RightEdit.vue"


import { useStore } from "vuex";
const store = useStore();

// 背景图片
const bg_path = "background/pattern-" + Math.ceil(Math.random() * 33) + ".svg"


// 右侧tag导航展开时的宽度控制
const width_show = ref("100%")
const width_tag = ref("0%")
watch(() => store.state.setval.right_navi, () => {
  if (store.state.setval.right_navi) {
    width_show.value = "60%"
    width_tag.value = "40%"
  } else {
    width_show.value = "100%"
    width_tag.value = "0%"
  }
})


import { url_image_list, url_sticker_list, url_video_list, url_tag_list, url_update_list } from "@/utils/url.js"
import { url_image, url_sticker, url_video } from "@/utils/url.js"

// 获取远程资源(index是json索引,urls是实际访问路径)
const image_index = ref("")
const image_urls: Ref<any> = ref({})
provide("image_urls", image_urls)
const sticker_index = ref("")
const sticker_urls: Ref<any> = ref({})
provide("sticker_urls", sticker_urls)
const video_index = ref("")
const video_urls: Ref<any> = ref({})
provide("video_urls", video_urls)
const tag_index = ref("")
provide("tag_index", tag_index)
const update_index = ref("")
provide("update_index", update_index)

const get_list = async (url_list: string, url_store: string, index_ref: Ref<string>, urls_ref: Ref<any> = ref({})) => {
  try {
    const response = await fetch(url_list)
    const data = await response.json()
    index_ref.value = data
    for (let pack in data) {
      urls_ref.value[pack] = []
      for (let i in data[pack]) {
        urls_ref.value[pack].push(url_store + pack + "/" + data[pack][i])
      }
    }
  } catch (error) {
    console.error(error)
  }
}


onMounted(() => {
  // 获取远程资源
  get_list(url_image_list, url_image, image_index, image_urls)
  get_list(url_sticker_list, url_sticker, sticker_index, sticker_urls)
  get_list(url_video_list, url_video, video_index, video_urls)
  // tag和updatea单独获取
  const get_index = async (url: string, save_ref: Ref<string>) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      save_ref.value = data
    } catch (error) {
      console.error(error)
    }
  }
  get_index(url_tag_list, tag_index)
  get_index(url_update_list, update_index)
})

// test按钮
const test_button = () => {
  console.log(video_urls.value)
}
</script>

<style scoped lang="scss">
/*  背景图片 */
div.bg-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  white-space: nowrap;


  div.bg-one {
    position: relative;
    display: inline-block;
    *display: inline;
    height: 100%;
    z-index: 0;
  }

  img.bg-img {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0.1;
  }
}

div.home {
  display: flex;
  flex-direction: row;
}

// 左侧导航
div.body-navi {
  height: auto;
}

div.body-navi:hover~div.body-center {
  margin-left: 400px;
}

div.body-center {
  width: calc(100vw - 95px);
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: row;
  position: absolute;
  margin-left: 80px;
  transition: 0.3s ease-in-out;

  // loading页
  div.body-loading {
    height: 100%;
    width: 100%;
  }

  // 中间搜索页
  div.body-search {
    width: 100%
  }

  // 中间图片显示
  div.body-main {
    transition: 0.3s ease-out;
  }

  // 右侧tag显示
  div.body-tag {
    transition: 0.3s ease-out;
  }
}
</style>

<!-- 全局style -->
<style>
@import '~csshake';

.pointer {
  cursor: pointer;
}

body {
  overflow: hidden;
}
</style>