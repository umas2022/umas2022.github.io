<template>
    <div class="link-card">

        <div class="title-box" @click="goto(link_json.link_page)">
            <img v-if="link_json.icon == ''" :src="'icon/null.svg' + link_json.icon" alt="">
            <img v-else :src="'icon/' + link_json.icon" alt="">
            <h3>{{ link_json.title }}</h3>
        </div>


        <!-- 右侧按钮 -->
        <!-- <div class="btn-box">
            <div class="divider" v-if="link_json.link_code != ''"></div>
            <div class="button" v-if="link_json.link_code != ''" @click="goto(link_json.link_code)">code</div>
            <div class="divider" v-if="link_json.link_mirror != ''"></div>
            <div class="button" v-if="link_json.link_mirror != ''" @click="goto(link_json.link_mirror)">mirror</div>
        </div> -->

    </div>
    <div style="height: 20px;"></div>
</template>


<script setup lang="ts" >
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps<{
    link_json: {
        icon: string;
        title: string;
        link_code: string;
        link_page: string;
        link_mirror: string;
    }
}>();


const goto = (url: string) => {
    console.log(url)
    window.location.href = url
}



onMounted(() => {
    if (window.innerWidth < 800) {
        let link_card = window.document.querySelectorAll(".link-card");
        link_card.forEach((linkCard) => {
            (linkCard as HTMLElement).style.width = "100%";
        });
    }
})


</script>

<style lang="scss" scoped>
div.link-card {
    width: 60%;
    height: 60px;
    border-radius: 21px;
    background: #e0e0e0;
    box-shadow: 14px 14px 39px #b5b5b5,
        -14px -14px 39px #ffffff;

    display: flex;
    align-items: center;

    user-select: none; // 禁止文本选中

    transition: all 0.2s; /* 添加过渡效果到宽度，1秒过渡时间 */

}

.link-card:hover {
    height: 70px;

    background: #d7d7d7;
    box-shadow: 23px 23px 57px #8b8b8b,
        -23px -23px 57px #ffffff;
}



// 左侧icon和title
div.title-box {
    height: 100%;
    // width: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    h3 {
        display: inline-block;
    }

    img {
        height: 70%;
        padding-left: 10px;
        padding-right: 10px;
    }
}

// 右侧按钮
div.btn-box {
    width: 50%;
    height: 100%;
    padding-right: 20px;



    display: flex;
    align-items: center;
    justify-content: flex-end;

    // 分割线

    .divider {
        height: 60%;
        border-left: 2px solid rgba(0, 0, 0, 0.2);

    }


    .button {

        cursor: pointer;
        margin: 5px;
        height: 80%;
        width: 80px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    .button:hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }


}
</style>