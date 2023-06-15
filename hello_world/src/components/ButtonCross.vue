<template>
    <!-- 叉号按钮,用于my-tag在修改tag时的删除 -->
    <div class="btn-cross">
        <div class="center">
            <img width="15" height="15" src="icon/cross.svg" alt="icon">
        </div>
    </div>
</template>

<style lang="scss" scoped>
div.btn-cross {
    display: inline-block;
    cursor: pointer;

    width: 20px;
    height: 20px;

    .center {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }


}

div.center :hover {
    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 10px;
}
</style>