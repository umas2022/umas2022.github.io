<template>
    <div class="button">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>

// 按钮基础样式
.button {
    display: inline-block;
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-decoration: none;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1.2em;
    padding: 0.5em 1em;
    color: black;
    border: 0.15em solid black;
    border-radius: 1.2em;
    transition: 0.5s;
    cursor: pointer;
    slot{
        cursor: pointer;
    }
    margin: 10px;
}


// 两个圆角矩形（波浪）
.button:before,
.button:after {
    content: "";
    position: absolute;
    top: -1.5em;
    z-index: -1;
    width: 200%;
    aspect-ratio: 1;
    border: none;
    border-radius: 40%;
    background-color: rgba(0, 0, 255, 0.25);
    transition: 3s;
}


// 旋转
.button:before {
    left: -80%;
    transform: translate3d(0, 5em, 0) rotate(-340deg);
}

.button:after {
    right: -80%;
    transform: translate3d(0, 5em, 0) rotate(390deg);
}

// 文本变白
.button:hover,
.button:focus {
    color: rgb(255, 0, 0);
    border-radius: 1em;
}

// 波浪颜色
.button:hover:before,
.button:hover:after,
.button:focus:before,
.button:focus:after {
    transform: none;
    background-color: rgba(0, 208, 255, 0.1);
}
</style>