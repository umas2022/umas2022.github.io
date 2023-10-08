<template>
    <div class="glass-container">
        <div class="glass shake-constant" style="--r:-15;" data-text="Blog" @click="goto('https://umas2023.github.io/')">
            <font-awesome-icon :icon="['fas', 'blog']" />
        </div>
        <div class="glass shake-constant" style="--r:5;" data-text="GitHub" @click="goto('https://github.com/umas2022')">
            <font-awesome-icon :icon="['fab', 'github']" />
        </div>
        <div class="glass shake-constant" style="--r:25;" data-text="About"
            @click="goto('https://github.com/umas2022/umas2022.github.io')">
            <font-awesome-icon icon="fa-solid fa-code" />
        </div>
        <div class="glass shake-constant" style="--r:-15;" data-text="Contact" @click="scroll_bottom">
            <font-awesome-icon :icon="['far', 'envelope']" />
        </div>
    </div>
</template>


<script lang="ts" setup>
import { watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore()


// 按钮跳转
const goto = (url: string) => {
    console.log(url)
    window.location.href = url
}




// 按钮跳转到底部
const scroll_bottom = () => {
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



// 开灯
watch(() => store.state.darkmode, () => {
    let glass_div_all = document.querySelectorAll<HTMLElement>(".glass")
    // 开灯
    if (!store.state.darkmode) {
        for (let glass_div of glass_div_all) {
            glass_div!.classList.add("hovered")
            glass_div!.classList.add("shake-slow")
        }
    }
    // 关灯
    else{
        for (let glass_div of glass_div_all) {
            glass_div!.classList.remove("hovered")
            glass_div!.classList.remove("shake-slow")
        }
    }
})

</script>


<style lang="scss" scoped>
@import '~csshake';


// 玻璃卡片
.glass-container {
    margin-top: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-container .glass {
    cursor: pointer;
    position: relative;
    width: 160px;
    height: 200px;
    background: linear-gradient(#fff2, transparent);
    backdrop-filter: blur(10px);
    border: solid 1px rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.5s;

    margin: 0 -45px;
    transform: rotate(calc(var(--r) * 1deg));

}

.glass-container:hover .glass {
    transform: rotate(0deg);
    margin: 0 20px;
}
.glass.hovered{
    transform: rotate(0deg);
    margin: 0 20px;
}

.glass-container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    color: black;
    text-align: center;
}

.glass-container .glass svg {
    font-size: 3em;
    color: black;
}
</style>