<template>
    <!-- 自定义极简tag -->
    <div :class="get_class()">
        <slot> </slot>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick, Ref, onMounted } from "vue";

const get_class = () => {
    let class_name = "cp-tag"
    if (props.type == "danger") {
        class_name = class_name + " danger"
    }
    if (props.hover) {
        class_name = class_name + " is_hover"
    }
    return class_name
}

// 父组件传参
const props = defineProps({
    type: {
        type: String,
        require: false
    },
    hover: {
        type: Boolean,
        require: false
    }
});


</script>

<style lang="scss" scoped>
div.cp-tag {

    border: solid 2px black;
    border-radius: 5px;
    white-space: nowrap;
    padding: 3px;
    height: 20px;
    font-size: 14px;
    display: inline-block;
    transition: 0.2s ease-in-out;
    display: flex;
    align-items: center;

    cursor: pointer;
}


div.is_hover:hover {
    background-color: rgba(0, 132, 255, 0.3);
}

div.danger {
    background-color: rgba(255, 85, 0, 0.3);
}
</style>