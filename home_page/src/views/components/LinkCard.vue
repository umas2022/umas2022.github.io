<template>
    <div class="link-card">

        <div class="title-box">
            <img v-if="link_json.icon == ''" :src="'icon/null.svg' + link_json.icon" alt="">
            <img v-else :src="'icon/' + link_json.icon" alt="">
            <h3>{{ link_json.title }}</h3>

        </div>
        <div class="discription">
            {{ link_json.description }}
        </div>


        <!-- 按钮 -->
        <div class="btn-box">
            <div class="divider"></div>
            <div class="button" v-if="link_json.link_page != ''" @click="goto(link_json.link_page)">
                <el-icon size="20">
                    <DataAnalysis />
                </el-icon>
                page
            </div>
            <div class="button" v-if="link_json.link_mirror != ''" @click="goto(link_json.link_mirror)">
                <el-icon size="20">
                    <CopyDocument />
                </el-icon>
                mirror
            </div>
            <div class="button" v-if="link_json.link_code != ''" @click="goto(link_json.link_code)">
                <el-icon size="20">
                    <Edit />
                </el-icon>
                code
            </div>

        </div>

    </div>
    <div style="height: 20px;"></div>
</template>


<script setup lang="ts" >
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import { DataAnalysis, CopyDocument, Edit } from '@element-plus/icons-vue'

const props = defineProps<{
    link_json: {
        icon: string;
        title: string;
        description: string;
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
    font-family: sans-serif;
    font-weight: 500;
    font-size: 1em;


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none; // 禁止文本选中
    transition: all 0.2s;
    padding: 5px;

    border-top: 2px solid rgba(0, 0, 0, 0.3);

}




// icon和title
div.title-box {
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
        display: inline-block;
    }

    img {
        width: 40px;
        padding-left: 10px;
        padding-right: 10px;
    }
}

// 按钮
div.btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    .el-icon {
        padding-right: 5px;
    }

    .button {

        border-left: 1px solid rgba(0, 0, 0, 0.5);
        border-right: 1px solid rgba(0, 0, 0, 0.5);

        cursor: pointer;
        margin: 5px;
        height: 30px;
        width: 100px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        transition: 0.5s;
    }

    .button:hover {
        border-radius: 10px;
        background-color: rgba(0, 208, 255, 0.1);
        color: red;
    }


}
</style>