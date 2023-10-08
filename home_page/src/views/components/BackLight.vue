<template>
  <div class="back-light">
    <!-- 灯 -->
    <div class="lamp-box  animate-box animate__animated animate__bounceInDown">
      <img src="static/lamp.svg" alt="">
      <!-- <img src="static/lamp.svg" alt=""> -->
      <!-- <img src="static/lamp.svg" alt=""> -->
    </div>
    <!-- 光 -->
    <div class="light-box   animate-box animate__animated animate__fadeIn">
      <div class="light"></div>
      <!-- <div class="light"></div> -->
      <!-- <div class="light"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

watch(() => store.state.darkmode, () => {
  let lamp_div = document.querySelector<HTMLElement>(".lamp-box")
  let light_div = document.querySelector<HTMLElement>(".light-box")
  // 关灯
  if (store.state.darkmode) {
    light_div!.style.display = "block"
    light_div!.classList.remove("animate__fadeIn")
    light_div!.classList.add("animate__fadeOut")
    setTimeout(() => {
      lamp_div!.style.display = "block"
      lamp_div!.classList.remove("animate__bounceInDown")
      lamp_div!.classList.add("animate__bounceOutUp")
    }, 500);
  }
  // 开灯
  else {
    lamp_div!.style.display = "block"
    lamp_div!.classList.remove("animate__bounceOutUp")
    lamp_div!.classList.add("animate__bounceInDown")
    setTimeout(() => {
      light_div!.style.display = "block"
      light_div!.classList.remove("animate__fadeOut")
      light_div!.classList.add("animate__fadeIn")
    }, 500);
  }
})


</script>

<style lang="scss" scoped>
@import 'animate.css';

div.back-light {
  // position: fixed;
  position: absolute;
  width: 100%;
  height: 100%;
}


// 灯
div.lamp-box {
  display: none;
  position: relative;
  width: 100%;

  img {
    width: 50px;
    position: absolute;
    transform: translateX(-50%);
  }
}

div.lamp-box img:nth-child(1) {
  left: 50%;
}


// 光
div.light-box {
  display: none;
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;

  .light {
    position: absolute;
    transform: translateX(-50%);

    // 半圆形
    height: 100%;
    // aspect-ratio: 3/1;
    width: 100%;
    border-radius: 80% / 50% 50% 0 0;

    // 线性渐变
    background: linear-gradient(rgb(249, 255, 185), transparent);
    opacity: 0.3;

    // 边缘模糊
    filter: blur(5px);
  }

}

.light-box .light:nth-child(1) {
  left: 50%;
}
</style>