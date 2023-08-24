<template>
    <div class="link-card">

        <div class="title-box">
            <img style="height: 80%;" :src="'icon/' + link_json.icon" alt="">
            <h3>{{ link_json.title }}</h3>
        </div>


        <!-- 右侧按钮 -->
        <div class="btn-box">
            <div class="button" v-if="link_json.link_code!=''" @click="goto(link_json.link_code)">code</div>
            <div class="button" v-if="link_json.link_page!=''" @click="goto(link_json.link_page)">page</div>
            <div class="button" v-if="link_json.link_mirror!=''" @click="goto(link_json.link_mirror)">mirror</div>
        </div>

    </div>
    <div style="height: 20px;"></div>
</template>


<script setup lang="ts" >
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
    window.location.href=url
}


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
}

div.title-box {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;

    h3 {
        display: inline-block;
    }

    img {
        padding-right: 10px;
    }
}

div.btn-box {
    width: 50%;
    height: 100%;
    padding-right: 20px;


    display: flex;
    align-items: center;
    justify-content: flex-end;

    .button {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin: 5px;
        height: 60%;
        width: 80px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;

        transition: border 1s ease;
    }

    .button:hover {
        border: 3px solid black;
        /* 在 hover 时显示边框 */
    }

}
</style>