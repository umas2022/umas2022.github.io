<template>
    <div class="cp-tag danger" v-if="props.type == 'danger'">
        <slot> </slot>
    </div>
    <div class="cp-tag" v-else>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick, Ref, onMounted } from "vue";


// 父组件传参
const props = defineProps({
    type: {
        type: String,
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
    width: 100%;
    height: 20px;
    cursor: pointer;
    font-size: 14px;
}
div.danger{
    background-color: rgba(0, 132, 255, 0.4);
}
</style>