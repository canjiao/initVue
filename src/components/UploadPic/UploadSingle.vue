<template>
  <div>
    <div class="upload-main" :style="{width:width,height:height}">
      <Upload
        ref="imageUpload"
        name="file"
        :on-exceeded-size="uploadSizeError"
        :on-format-error="uploadFormatError"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        accept="image/*"
        type="drag"
        :max-size="maxSize"
        :headers="upload.headers"
        :action="upload.url"
        :before-upload="uploadBefore"
        :on-error="uploadError"
        :on-success="uploadSuccess"
      >
        <div class="upload-preview"  :style="{width:width,height:height}" >
          <img
            v-if="url"
            :src="url"
          />
          <Spin
            fix
            v-if="showLoading"
          >
          </Spin>
          <div class="mask" v-show="showMask" ></div>
          <Icon
           v-if="!url || showMask"
            class="upload-btn"
            type="ios-camera"
            :size="parseInt(width)/3"
          ></Icon>
        </div>
      </Upload>
    </div>
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
      default: function() {
        return {
          url: Config.apiHost + "/upload/image",
          headers: {
            sessionId: this.$store.state.user.token
          }
        };
      }
    },
    width:{
      type:String,
      default:"120px"
    },
    height:{
      type:String,
      default:"120px"
    },
    //图片的URL
    url: {
      type: String,
      require: true
    },
    //上传的最大次数
    maxSize: {
      type: Number,
      default:10240
    },
  },
  data() {
    return {
      showMask:false,
      showLoading: false
    };
  },
  methods: {
    uploadSuccess: function(response, file, fileList) {
      this.showLoading = false;
      if (response.status != 1) {
        this.$Notice.error({
          title: "提示",
          desc: response.message
        });
        return false;
      }
      this.$emit("update:url", response.data);
      this.$emit("success", response);
    },
    uploadBefore: function() {
      this.showLoading = true;
    },
    uploadError: function() {
      this.showLoading = false;
      this.$Notice.warning({
        title: "提示",
        desc: "上传失败"
      });
    },
    uploadFormatError: function() {
      this.showLoading = false;
      this.$Notice.warning({
        title: "提示",
        desc: "上传图片的格式只能为jpg，jpeg，png"
      });
    },
    uploadSizeError: function() {
      this.showLoading = false;
      let imgSize=this.maxSize/1024;
      this.$Notice.warning({
        title: "提示",
        desc: "上传图片最大限制为"+imgSize+"M"
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
  }
};
</script>
<style lang="less" scoped>

.upload-preview {
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .mask{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);

  }
  .upload-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

