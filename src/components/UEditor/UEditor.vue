<template>
    <div class="ueditor">
        <vue-ueditor-wrap
            :config="config"
            v-model="myContent"
            @ready="readyEditor"
            @before-init="initEditor"
            ref="ueditor"
            class="ueditor-wrap"
        >
        </vue-ueditor-wrap>
        <Modal v-model="show" title="上传图片" @on-ok="insertPicToEditor">
            <UploadSingle
                ref="uploadsingle"
                :list.sync="imagesList"
                :maxTimes="10"
            ></UploadSingle>
        </Modal>
    </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import UploadSingle from "../UploadPic/UploadSingle";
import Config from "@/utils/config.js";
export default {
    name: "UEditor",
    components: {
        VueUeditorWrap,
        UploadSingle,
    },
    props: {
        //编辑的内容
        content: {
            type: String,
            required: true,
        },
        setConfig: {
            type: Object,
            required: false,
        },
        moreToolbar: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    computed: {
        myContent: {
            get() {
                return this.content;
            },
            set(newVal) {
                this.$emit("update:content", newVal);
            },
        },
    },
    data() {
        return {
            imagesList: [], //图片上传数组
            show: false,
            ueditor: {}, //编辑器实例
            //编辑器配置
            config: {
                zIndex: 800,
                //资源文件的存放路径，如果使用的是 vue-cli 3.0 生成的项目，通常不需要设置该选项，
                UEDITOR_HOME_URL: Config.staticDir + "/UEditor/",
                serverUrl: "",
                toolbars: [
                    [
                        "undo",
                        "redo",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "fontborder",
                        "strikethrough",
                        "|",
                        "forecolor",
                        "backcolor",
                        "fontsize",
                        "justifyleft",
                        "justifycenter",
                        "justifyright",
                        "|",
                        "|",
                        "selectall",
                        "cleardoc",
                        "removeformat",
                    ].concat(...this.moreToolbar),
                ],
                elementPathEnabled: false, //删除元素路径
                wordCount: false, //删除字数统计
                initialFrameHeight: 580,
                autoHeightEnabled: true,
                ...this.setConfig,
            },
        };
    },
    methods: {
        /**
         * 实例化编辑器，注册上传图片组件
         */
        initEditor(editorId) {
			let ueObj = this.$refs.ueditor;
            window.UE.registerUI(
                "UploadSingle",
                (editor, uiName) => {
                    return new window.UE.ui.Button({
                        index: 2,
                        name: uiName,
						title: "上传图片",
						cssRules: "background-position: -380px 0px;",
                        onclick: () => {
                            this.show = true;
                        },
                    });
                },
                0,
                editorId // ueObj.id
            );
        },
        /**
         * 获取编辑器实例
         */
        readyEditor(editorInstance) {
            this.ueditor = editorInstance;
        },
        //商品描述-插入图片到编辑器
        insertPicToEditor() {
            let data = this.imagesList;
            let imgUrl = [];
            if (data && data.length) {
                for (let i = 0; i < data.length; i++) {
                    imgUrl.push('<img src="' + data[i].url + '" />');
                }
                this.ueditor.execCommand("inserthtml", imgUrl.join("<br/>"));
                this.$refs.uploadList.clear();
                this.imagesList = [];
            }
        },
        // 插入内容，外部ref调用
        insert(str) {
            this.ueditor.execCommand("inserthtml", str);
        },
    },
};
</script>
<style lang="less" scoped>
.ueditor {
    max-width: 1000px;
    line-height: 1;
}
</style>

