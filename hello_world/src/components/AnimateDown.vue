<template>
    <!-- 左右切换动画 -->
    <div class="cp-animate  animate__animated animate__bounceInLeft" ref="ani_ref">
        <slot name="content"></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from "vue";


// 父组件传参
const props = defineProps<{
    // 显示控制
    display: boolean,
    // 运动方向
    direction: "left" | "right"
}>();

// 组件ref
const ani_ref = ref<HTMLDivElement>()

// 初始状态
onMounted(() => {
    if (!props.display) {
        ani_ref.value!.classList.add("close")
    }
})

// 触发状态切换
watch(() => props.display, () => {
    state_change()
})


// 正在变换中
const in_process = ref(false)

const state_change = () => {
    if (in_process.value) {
        return
    }
    if (props.direction == "left") {
        if (props.display) {
            ani_ref.value!.classList.remove("animate__bounceOutLeft")
            ani_ref.value!.classList.add("animate__bounceInRight")
            in_process.value = true
            setTimeout(() => {
                ani_ref.value!.style.zIndex = "99"
                ani_ref.value!.classList.remove("close")
                in_process.value = false
            }, 50);
        } else {
            ani_ref.value!.classList.remove("animate__bounceInRight")
            ani_ref.value!.classList.add("animate__bounceOutLeft")
            in_process.value = true
            setTimeout(() => {
                ani_ref.value!.style.zIndex = "0"
                ani_ref.value!.classList.add("close")
                in_process.value = false
            }, 500)
        }
    } else if (props.direction == "right") {
        if (props.display) {
            ani_ref.value!.classList.remove("animate__bounceOutRight")
            ani_ref.value!.classList.add("animate__bounceInLeft")
            in_process.value = true
            setTimeout(() => {
                ani_ref.value!.style.zIndex = "99"
                ani_ref.value!.classList.remove("close")
                in_process.value = false
            }, 50);
        } else {
            ani_ref.value!.classList.remove("animate__bounceInLeft")
            ani_ref.value!.classList.add("animate__bounceOutRight")
            in_process.value = true
            setTimeout(() => {
                ani_ref.value!.style.zIndex = "0"
                ani_ref.value!.classList.add("close")
                in_process.value = false
            }, 500)
        }
    }

}
</script>


<style scoped lang="scss">
@import 'animate.css';

div.close {
    display: none;
}
</style>

