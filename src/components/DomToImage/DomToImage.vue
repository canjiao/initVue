<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import domtoimage from "dom-to-image";
export default {
    name: "DomToImage",
    props:{
        id:{
            type:String,
            default:'domtoimage'
        }
    },
    data() {
        return {}; 
    },
    components: {},
    filters: {},
    watch: {},
    computed: {},
    methods: {
        toImage(){
            domtoimage
                .toJpeg(document.getElementById(this.id), { qualify: 0.8 })
                .then((imgUrl) => {
                    console.log(imgUrl);
                    var link = document.createElement('a');
                    link.download = 'my-image-name.jpeg';
                    link.href = imgUrl;
                    link.click();
                })
                .catch((error) => {
                    //此处可以关闭loading
                    this.$Message.error(
                        "生成图片失败，无法下载！"
                    );
                });
        },
    },
    created() {},
};
</script>

<style lang='less' scoped>
</style>
