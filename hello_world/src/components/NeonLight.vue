<template>
    <!-- 霓虹灯边框效果 -->
    <div class="neon-box">
        <div class="sign">
            <span v-if="props.color==undefined" class="sign__word_blue"><slot></slot></span>
            <span v-else-if="props.color=='blue'" class="sign__word_blue"><slot></slot></span>
            <span v-else-if="props.color=='red'" class="sign__word_red"><slot></slot></span>
            <span v-else-if="props.color=='green'" class="sign__word_green"><slot></slot></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick, Ref, onMounted } from "vue";

// 父组件传参
const props = defineProps({
    color: {
        type: String,
        require: false
    }
});

</script>

<style lang="scss" scoped>
div.neon-box{
    font-family: "Vibur", cursive;
    font-size: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/*-- Sign Styles --*/
.sign {
    min-height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

// 浅蓝色
.sign__word_blue {
    font-size: 5.6rem;
    text-align: center;
    line-height: 1;
    color: #c6e2ff;
    -webkit-animation: neon_blue .08s ease-in-out infinite alternate;
    animation: neon_blue .08s ease-in-out infinite alternate;
}
@-webkit-keyframes neon_blue {
    from {
        text-shadow: 0 0 6px rgba(202, 228, 225, 0.92), 0 0 30px rgba(202, 228, 225, 0.34), 0 0 12px rgba(30, 132, 242, 0.52), 0 0 21px rgba(30, 132, 242, 0.92), 0 0 34px rgba(30, 132, 242, 0.78), 0 0 54px rgba(30, 132, 242, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(202, 228, 225, 0.98), 0 0 30px rgba(202, 228, 225, 0.42), 0 0 12px rgba(30, 132, 242, 0.58), 0 0 22px rgba(30, 132, 242, 0.84), 0 0 38px rgba(30, 132, 242, 0.88), 0 0 60px #1e84f2;
    }
}
@keyframes neon_blue {
    from {
        text-shadow: 0 0 6px rgba(202, 228, 225, 0.92), 0 0 30px rgba(202, 228, 225, 0.34), 0 0 12px rgba(30, 132, 242, 0.52), 0 0 21px rgba(30, 132, 242, 0.92), 0 0 34px rgba(30, 132, 242, 0.78), 0 0 54px rgba(30, 132, 242, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(202, 228, 225, 0.98), 0 0 30px rgba(202, 228, 225, 0.42), 0 0 12px rgba(30, 132, 242, 0.58), 0 0 22px rgba(30, 132, 242, 0.84), 0 0 38px rgba(30, 132, 242, 0.88), 0 0 60px #1e84f2;
    }
}


// 红色
.sign__word_red {
    font-size: 5.6rem;
    text-align: center;
    line-height: 1;
    color: #fb8e8e;
    -webkit-animation: neon_red .08s ease-in-out infinite alternate;
    animation: neon_red .08s ease-in-out infinite alternate;
}
@-webkit-keyframes neon_red {
    from {
        text-shadow: 0 0 6px rgba(228, 202, 202, 0.92), 0 0 30px rgba(228, 202, 202, 0.34), 0 0 12px rgba(242, 30, 30, 0.52), 0 0 21px rgba(242, 30, 30, 0.92), 0 0 34px rgba(242, 30, 30, 0.78), 0 0 54px rgba(242, 30, 30, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(228, 202, 202, 0.98), 0 0 30px rgba(228, 202, 202, 0.42), 0 0 12px rgba(242, 30, 30, 0.58), 0 0 22px rgba(242, 30, 30, 0.84), 0 0 38px rgba(242, 30, 30, 0.88), 0 0 60px #f26f1e;
    }
}
@keyframes neon_red {
    from {
        text-shadow: 0 0 6px rgba(228, 202, 202, 0.92), 0 0 30px rgba(228, 202, 202, 0.34), 0 0 12px rgba(242, 30, 30, 0.52), 0 0 21px rgba(242, 30, 30, 0.92), 0 0 34px rgba(242, 30, 30, 0.78), 0 0 54px rgba(242, 30, 30, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(228, 202, 202, 0.98), 0 0 30px rgba(228, 202, 202, 0.42), 0 0 12px rgba(242, 30, 30, 0.58), 0 0 22px rgba(242, 30, 30, 0.84), 0 0 38px rgba(242, 30, 30, 0.88), 0 0 60px #f26f1e;
    }
}

// 绿色
.sign__word_green {
    font-size: 5.6rem;
    text-align: center;
    line-height: 1;
    color: #8efb92;
    -webkit-animation: neon_green .08s ease-in-out infinite alternate;
    animation: neon_green .08s ease-in-out infinite alternate;
}
@-webkit-keyframes neon_green {
    from {
        text-shadow: 0 0 6px rgba(208, 228, 202, 0.92), 0 0 30px rgba(208, 228, 202, 0.34), 0 0 12px rgba(48, 242, 30, 0.52), 0 0 21px rgba(48, 242, 30, 0.92), 0 0 34px rgba(48, 242, 30, 0.78), 0 0 54px rgba(48, 242, 30, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(208, 228, 202, 0.98), 0 0 30px rgba(208, 228, 202, 0.42), 0 0 12px rgba(48, 242, 30, 0.58), 0 0 22px rgba(48, 242, 30, 0.84), 0 0 38px rgba(48, 242, 30, 0.88), 0 0 60px #93f21e;
    }
}
@keyframes neon_green {
    from {
        text-shadow: 0 0 6px rgba(208, 228, 202, 0.92), 0 0 30px rgba(208, 228, 202, 0.34), 0 0 12px rgba(48, 242, 30, 0.52), 0 0 21px rgba(48, 242, 30, 0.92), 0 0 34px rgba(48, 242, 30, 0.78), 0 0 54px rgba(48, 242, 30, 0.92);
    }

    to {
        text-shadow: 0 0 6px rgba(208, 228, 202, 0.98), 0 0 30px rgba(208, 228, 202, 0.42), 0 0 12px rgba(48, 242, 30, 0.58), 0 0 22px rgba(48, 242, 30, 0.84), 0 0 38px rgba(48, 242, 30, 0.88), 0 0 60px #93f21e;
    }
}


</style>