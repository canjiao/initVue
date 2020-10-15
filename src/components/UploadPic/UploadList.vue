<template>
    <div>
		<!-- 上传后的图片展示列表 -->
        <div class="demo-upload-list" v-for="item in myList" :key="item.url">
			<!-- 上传完成 -->
            <template v-if="item.status === 'finished'">
                <img :src="item.url" />
				<!-- 用viewer插件去预览 -->
                <viewer :options="options" @inited="inited" class="viewer" ref="viewer" v-if="showViewer">
					<img v-for="(item, index) in list" :key="index" :src="item.url"/>
					<div class="demo-upload-list-cover">
						<Icon type="ios-eye-outline" @click="show"></Icon>
						<Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="showDel"></Icon>
					</div>
                </viewer>
				<!-- 用i-view的modal弹出框预览 -->
                <div class="demo-upload-list-cover" v-else>
                    <Icon type="ios-eye-outline" @click="handleView(item, myList)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="showDel" ></Icon>
                </div>
            </template>
			<!-- 上传中 -->
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
		<!-- 上传组件 -->
        <Upload
            v-show="list.length < maxTimes && defalutShow"
            ref="imageUpload"
            :show-upload-list="false"
            :default-file-list="defalutList"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            accept="image/*"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :multiple="maxTimes > 1"
            :action="upload.url"
            :headers="upload.headers"
            style="display: inline-block; width: 108px"
        >
            <div style="width: 108px; height: 108px; line-height: 108px">
                <Icon type="ios-camera" size="40"></Icon>
            </div>
        </Upload>
		<!-- 预览图片模态框 -->
        <Modal title="查看" v-model="proudctImage.visible" class="view-modal">
            <img :src="proudctImage.curPath" v-if="proudctImage.visible" style="width: 100%"/>
        </Modal>
    </div>
</template>
<script>
import Config from "@/utils/config.js";
// import 'viewerjs/dist/viewer.css'
// import Viewer from "v-viewer/src/component.vue"
export default {
    name: "UploadList",
    components: {
        // Viewer
    },
    props: {
        //绑定的图片数组
        list: {
            type: Array,
            required: true,
        },
        //上传图片配置
        upload: {
            type: Object,
            default: function () {
                return {
                    url: Config.apiHost + "/upload/image",
                    headers: {
                        sessionId: this.$store.state.user.token,
                    },
                };
            },
        },
        //上传的最大次数
        maxTimes: {
            type: Number,
            default: 5,
        },
        //默认的数组,[{url:""}]
        defalutList: {
            type: Array,
            default: function () {
                return [];
            },
        },
        //是否展示viewer
        showViewer: {
            type: Boolean,
            default: false,
        },
        showDel: {
            type: Boolean,
            default: true,
        },
        //是否显示上传
        defalutShow: {
            type: Boolean,
            default: true,
        },
    },
    mounted() {
        this.myList = this.$refs.imageUpload.fileList;
    },
    computed: {
        myList: {
            get() {
                this.defalutList;
                return this.list;
            },
            set(newValue) {
                this.$emit("update:list", newValue);
            },
        },
    },
    watch: {
        myList() {
            this.$nextTick(() => {
                this.myList = this.$refs.imageUpload.fileList;
            });
        },
    },
    data() {
        return {
            proudctImage: {
                visible: false,
                curPath: "",
            },
            options: {
                navbar: false,
                button: true,
                title: false,
                keyboard: false,
                zoomable: false,
                scalable: false,
            },
        };
    },
    methods: {
        //商品图片-点击预览
        handleView(image, arr) {
            this.proudctImage.curPath = image.url;
            this.proudctImage.visible = true;
        },
        //商品图片-移除图片
        handleRemove(file) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确认要删除吗？",
                onOk: () => {
                    let fileList = this.$refs.imageUpload.fileList;
                    let index = fileList.indexOf(file);
                    this.$refs.imageUpload.fileList.splice(index, 1);
                },
            });
        },
        //上传成功
        handleSuccess: function (res, file) {
            if (res.status == 1) {
                file.url = res.data;
                file.status = "finished";
            } else {
                this.$Notice.error({
                    title: "提示",
                    desc: res.message,
                });
            }
        },
        //格式不正确
        handleFormatError: function (file) {
            this.$Notice.error({
                title: "提示",
                desc: '文件 "' + file.name + '" 格式不正确',
            });
        },
        //文件太大
        handleMaxSize: function (file) {
            this.$Notice.error({
                title: "提示",
                desc: '文件 "' + file.name + '" 太大，不能超出2M',
            });
        },
        //最多上传次数
        handleBeforeUpload: function (file) {
            var check = this.list.length < this.maxTimes;
            if (!check) {
                this.$Notice.error({
                    title: "提示",
                    desc: "最多可以上传" + this.maxTimes + "张照片",
                });
            }
            return check;
        },
        /**
         * 清空文件列表
         */
        clear() {
            if (this.$refs.imageUpload) {
                this.$refs.imageUpload.clearFiles();
            }
        },
        inited(viewer) {
            this.$viewer = viewer;
        },
        show(e) {
            let index = $(e.target)
                .parents(".imageUpload")
                .find(".demo-upload-list")
                .index($(e.target).parents(".demo-upload-list"));
            this.$viewer.show();
            this.$viewer.view(index);
        },
    },
};
</script>
<style lang="less" scoped>
.demo-upload-list {
    display: inline-block;
    width: 108px;
    height: 108px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
    img {
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        line-height: 108px;
        i {
            color: #fff;
            font-size: 20px;
            font-size: 23px;
            cursor: pointer;
            margin: 0 2px;
        }
    }
    &:hover .demo-upload-list-cover {
        display: block;
    }
}
.view-modal /deep/ {
    .ivu-modal-wrap,
    .ivu-modal-mask {
        z-index: 1006;
    }
}
</style>

