<template>
  <div class="home">
    <!-- 左边文字 -->
    <div class="home-left animate__animated animate__fadeInLeft">
      <div class="text">
        <h1>u导航</h1>
        <div>
          <span>umas' awesome description</span> <br>
          <span>for my new site here.</span><br>
          <div style="height: 30px;"></div>
          <a href="https://github.com/umas2022/umas2022.github.io">About this page</a>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider animate__animated animate__fadeInDown">
      <div class="line"></div>
    </div>

    <!-- 右边链接 -->
    <div class="home-right">
      <div class="link-box">
        <el-scrollbar>
          <div class="card-each" style="display: none;" v-for="(item, index) in navi_index" :key="index">
            <LinkCard :link_json="item" />
          </div>
        </el-scrollbar>
      </div>
    </div>

  </div>
</template>


<script lang="ts" setup>

import { onMounted, reactive } from "vue";
import LinkCard from "./components/LinkCard.vue"


const navi_index = reactive({
  "backyard": {
    icon: "backyard.png",
    title: "弔图主页",
    link_code: "https://github.com/umas2022/backyard",
    link_page: "https://umas2022.github.io/backyard",
    link_mirror: ""
  },
  "blog": {
    icon: "blog.png",
    title: "个人博客",
    link_code: "https://github.com/umas2023/umas2023.github.io",
    link_page: "https://umas2023.github.io/",
    link_mirror: ""
  },
  "easyp": {
    icon: "easyp.jpg",
    title: "约饭速P",
    link_code: "https://github.com/umas2022/easyP",
    link_page: "https://umas2022.github.io/easyP/",
    link_mirror: ""
  },
  "ubk": {
    icon: "ubk.png",
    title: "极简记账(迁移中)",
    link_code: "https://github.com/umas2022/ubk_page",
    link_page: "https://umas2022.github.io/ubk_page/",
    link_mirror: ""
  },
  "pctools": {
    icon: "",
    title: "电脑配件(迁移中)",
    link_code: "",
    link_page: "",
    link_mirror: ""
  },
  "auto_trans": {
    icon: "",
    title: "漫画ocr翻译(迁移中)",
    link_code: "",
    link_page: "",
    link_mirror: ""
  },
  "poke_search": {
    icon: "",
    title: "宝可梦搜(迁移中)",
    link_code: "",
    link_page: "",
    link_mirror: ""
  },
  "test": {
    icon: "",
    title: "test",
    link_code: "test",
    link_page: "teest",
    link_mirror: "tesssst"
  }
})


onMounted(() => {
  const linkCards = document.querySelectorAll('.link-box .card-each');
  let delay = 0;

  linkCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate__animated', 'animate__fadeInRight');
      (card as HTMLElement).style.display = 'block';
    }, delay);

    delay += 200; // Adjust the delay as needed
  });

})


</script>

<style lang="scss" scoped>
@import 'animate.css';


div.home {
  background: #e0e0e049;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;

  // 分割线
  .divider {
    height: 80%;
    display: flex;
    align-items: center;

    .line {
      border: solid 1px rgba(0, 0, 0, 0.3);
      height: 80%;
    }
  }

  // 左边
  .home-left {
    width: 40%;
    margin-right: 20px;
    margin-bottom: 20%;
    display: flex;
    align-items: center;

    div.text {
      text-align: right;
      margin-left: auto; // 靠右
    }
  }

  // 右边
  .home-right {
    width: 60%;
    margin-left: 20px;
    margin-bottom: 10%;
    display: flex;
    align-items: center;

    div.link-box {
      width: 100%;
      height: 60%;

      div.card-each {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>