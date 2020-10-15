<template>
    <div>
        <div
            class="img"
            :style="'width:' + width + 'px;height:' + height + 'px;'"
        >
            <div
                class="img-layer"
                :style="'line-height:' + height + 'px;'"
                @click="showViewModal = true"
            >
                <Icon type="ios-eye-outline" />
            </div>
            <img :src="imgSrc" alt="" />
        </div>
        <Modal v-model="showViewModal" title="查看" class="view-img-modal">
            <img :src="imgSrc" alt="" style="width: 100%" />
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            showViewModal: false,
        };
    },
    props: {
        imgSrc: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            default: () => 100,
        },
        height: {
            type: [Number, String],
            default: () => 100,
        },
    },
};
</script>
<style lang="less" scoped>
.img {
    position: relative;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    img {
        width: 100%;
		height: 100%;
		display: block;
    }
    &:hover .img-layer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.img-layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 100px;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    z-index: 1000;
    display: none;
    i {
        color: rgb(255, 255, 255);
        font-size: 23px;
        cursor: pointer;
        margin: 0px 2px;
    }
}
.view-img-modal /deep/ {
    .ivu-modal-body {
        text-align: center;
    }
}
</style>
