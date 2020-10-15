<template>
    <div>
        <div class="upload-main" :style="{ width: width, height: height }">
            <Upload
                ref="imageUpload"
                name="file"
                :on-exceeded-size="uploadSizeError"
                :on-format-error="uploadFormatError"
                :show-upload-list="false"
                :format="['jpg', 'jpeg', 'png']"
                accept="image/*"
                type="drag"
                :max-size="maxSize"
                :headers="upload.headers"
                :action="upload.url"
                :before-upload="uploadBefore"
                :on-error="uploadError"
                :on-success="uploadSuccess"
				:disabled="!!url" 
            >
                <div class="upload-preview" :style="{ width: width, height: height }">
					<Spin fix v-if="showLoading"> </Spin>
					<Icon v-if="!url" class="upload-btn" type="ios-camera" :size="parseInt(width) / 3"></Icon>
					<template v-else>
						<img v-if="url" :src="url" />
						<div class="mask"></div>
						<Icon class="eye-btn" color="#fff" type="ios-eye-outline" :size="parseInt(width) / 4" @click="handleView()"></Icon>
						<Icon class="del-btn" color="#fff" type="ios-trash-outline" :size="parseInt(width) / 4" @click.stop.native="handleRemove()"></Icon>
					</template>		
                </div>
            </Upload>
        </div>
		<!-- 预览图片模态框 -->
        <Modal title="查看" v-model="visible" class="view-modal" footer-hide>
            <img :src="url" style="width: 100%"/>
        </Modal>
    </div>
</template>
<script>
import Config from "@/utils/config.js";
export default {
    name: "UploadSingle",
    props: {
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
        width: {
            type: String,
            default: "120px",
        },
        height: {
            type: String,
            default: "120px",
        },
        //图片的URL
        url: {
            type: String,
            require: true,
        },
        //上传的最大次数
        maxSize: {
            type: Number,
            default: 10240,
        },
    },
    data() {
        return {
			showLoading: false,
			visible:false,
        };
    },
    methods: {
        uploadSuccess: function (response, file, fileList) {
            this.showLoading = false;
            if (response.status != 1) {
                this.$Notice.error({
                    title: "提示",
                    desc: response.message,
                });
                return false;
            }
            this.$emit("update:url", response.data);
            this.$emit("success", response);
        },
        uploadBefore: function () {
            this.showLoading = true;
        },
        uploadError: function () {
            this.showLoading = false;
            this.$Notice.warning({
                title: "提示",
                desc: "上传失败",
            });
        },
        uploadFormatError: function () {
            this.showLoading = false;
            this.$Notice.warning({
                title: "提示",
                desc: "上传图片的格式只能为jpg，jpeg，png",
            });
        },
        uploadSizeError: function () {
            this.showLoading = false;
            let imgSize = this.maxSize / 1024;
            this.$Notice.warning({
                title: "提示",
                desc: "上传图片最大限制为" + imgSize + "M",
            });
        },
        /**
         * 清空文件列表
         */
        clear() {
            if (this.$refs.imageUpload) {
                this.$refs.imageUpload.clearFiles();
            }
		},
		
		handleView(){
			this.visible = true;
		},
		handleRemove(){
			this.$emit("update:url", '');
		}
    },
};
</script>
<style lang="less" scoped>
.upload-preview {
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: none;
	}
    .upload-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
	}
	.eye-btn{
		display: none;
		position: absolute;
		top: 50%;
		left:50%;
		transform: translate(-125%, -50%);
	}
	.del-btn{
		display: none;
		position: absolute;
		top: 50%;
		left:50%;
		transform: translate(25%, -50%);
	}
	&:hover {
		.mask,.eye-btn,.del-btn{
			display: block;
		}
	}
}
</style>

