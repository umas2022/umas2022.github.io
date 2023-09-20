<template>
  <div class="home">

    <!-- <el-button @click="test_button">test</el-button> -->

    <!-- 背景图 -->
    <div class="bg-box" :style="{ backgroundImage: `url(${bg_url})` }"></div>

    <!-- 主页 -->
    <div class="home-center">
      <div class="logo-container  animate__animated animate__backInDown">
        <img src="favicon.svg" alt="logo">
      </div>
      <div class="txt-container animate__animated animate__fadeIn">
        <h1>u导航</h1>
        <span>umas' awesome homepage</span> <br>
        <span>Learning | Recording | Sharing | (Be Happy)</span><br>
      </div>
      <!-- <a href="https://github.com/umas2022/umas2022.github.io">About this page</a> -->
      <div class="btn-container animate__animated animate__fadeIn">
        <WaveButton @click="goto('https://umas2023.github.io/')">Blog</WaveButton>
        <WaveButton @click="goto('https://github.com/umas2022')">GitHub</WaveButton>
        <WaveButton @click="goto('https://github.com/umas2022/umas2022.github.io')">About</WaveButton>
        <WaveButton @click="scroll_bottom">Contact</WaveButton>
      </div>
      <div class="rear-container  animate__animated animate__bounce">
        <el-icon size="40">
          <ArrowDown />
        </el-icon>
      </div>
    </div>

    <!-- 项目链接 -->
    <div class="link-container">
      <div class="card-each" v-for="( item, index ) in  index_json " :key="index">
        <LinkCard :link_json="item" />
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="info-container">
      umas_in_2023 | umas2017@outlook.com
    </div>

  </div>
</template>


<script lang="ts" setup>

import LinkCard from "./components/LinkCard.vue"
import WaveButton from "./components/WaveButton.vue"

import { onMounted, reactive, ref } from "vue";


import { ArrowDown } from '@element-plus/icons-vue'

import index_json from "@/assets/index.json"


// 背景图片序号
const bg_num = Math.floor(Math.random() * 33) + 1;
const bg_url = '/background/pattern-' + bg_num + '.svg';


// 按钮跳转
const goto = (url: string) => {
    console.log(url)
    window.location.href = url
}
// 按钮跳转到底部
const scroll_bottom = ()=>{
    // 获取文档内容的高度
    const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // 将滚动条滚动到最底端
  window.scrollTo({
    top: documentHeight,
    behavior: 'smooth' // 可选，平滑滚动效果
  });
}


// 底部箭头持续抖动
onMounted(() => {
  const arrow_bounce = () => {
    const rear_ctn = document.querySelector(".rear-container") as HTMLElement
    rear_ctn?.classList.remove("animate__bounce")
    void rear_ctn.offsetWidth; // 强制重绘
    rear_ctn?.classList.add("animate__bounce")
  }
  // 时间间隔
  let time_interval = 2000
  // 设置定时器
  let set_id = setInterval(arrow_bounce, time_interval)
})



// 滚动条监听
onMounted(() => {
  const scroll_trigger = () => {
    let card_list = document.querySelectorAll(".card-each")
    card_list.forEach(card_each => {
      let card_element = card_each as HTMLElement
      if(card_element.offsetTop < window.scrollY + window.innerHeight){
        card_element.classList.add("active")
      } else{
        card_element.classList.remove("active")
      }
    })
  }
  window.addEventListener("scroll", scroll_trigger)
})


// 测试按钮
const test_button = () => {
  const rear_ctn = document.querySelector(".rear-container")
  rear_ctn?.classList.add("animate__bounce")
  setTimeout(() => {
    rear_ctn?.classList.remove("animate__bounce")
  }, 500);
}

</script>

<style lang="scss" scoped>
@import 'animate.css';

div.bg-box {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: repeat;
  background-size: 400px;
  z-index: -1;
}

div.home {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
}

.home svg {
  opacity: 0.5;
  /* 设置透明度为 0.5 */
}

// 主页
div.home-center {
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .logo-container {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .txt-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: sans-serif;
    font-weight: 400;
    font-size: 18px;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    user-select: none;



    .home-btn {
      height: 40px;
      width: 80px;
      border: solid 2px black;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      cursor: pointer;
    }
  }

  .rear-container {
    margin-top: auto;
  }
}


// 下部链接
div.link-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 2500px;

  .card-each {
    width: 70%;
    transition: 1s;
    transform: translate(0,400px) scale(0);
  }
  .card-each.active{
    transform: translate(0,0) scale(1);
  }
}

// 底部信息
div.info-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
</style>