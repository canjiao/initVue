<template>
    <div style="height:1500px">
        首页{{10 | formatAmount}}
        <Button type="primary" @click="$router.push('/user/orderList')">进入用户订单列表页</Button>
        <Input v-model.number="val" v-number></Input>
        <span v-scrollTo v-fixed="{left:100,top:500}">返回顶部</span>
        <ScaleImg imgSrc="https://file.iviewui.com/asd/asd-pro-3.png" height="auto"></ScaleImg>
        <button type="button"
            v-clipboard:copy="val"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">点击复制
        </button>
        <img id="qrcode" src=""></img>
        <UEditor :content.sync="content"></UEditor>
        <UploadSingle :url.sync="val"></UploadSingle>
        <p v-ellipsis.title.always="2" style="width:200px;">大家快点哈记得哈的骄傲快点哈健康的大厦健康的大家快点哈记得哈的骄傲快点哈健康的大厦健康的</p>
    </div>
</template>

<script>
import PrintLodop from '@/components/PrintModal/PrintLodop';
import Print from '@/components/Print/Print';
import DomToImage from '@/components/DomToImage/DomToImage'
import ScaleImg from '@/components/ScaleImg.vue/ScaleImg'
import UEditor from "@/components/UEditor/UEditor.vue";
import UploadSingle from "@/components/UploadPic/UploadSingle";

import QRCode from "qrcode";
export default {
    name: 'home',
    data () {
        return {
            val:'',
            visible:false,
            content:'',
        }
    },
    components: {
        PrintLodop,
        Print,
        DomToImage,
        ScaleImg,
        UEditor,
        UploadSingle
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {
        print(event){
            let div = '<div>123</div>'
            event(div);
        },
        printNewPage(event){
            event();
        },
        onCopy: function (e) {
            // alert('You just copied: ' + e.text)
            // new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");
            QRCode.toDataURL('http://www.runoob.com"').then(url => {
                console.log(url)
                document.getElementById("qrcode").src = url;
            })
            .catch(err => {
                console.error(err)
            })
        },
        onError: function (e) {
            alert('Failed to copy texts')
        }
    },
    created(){
        this.$api.common.login({phone:'123'})
        this.$storage.Cookie.set('name','liucan')
        this.$store.dispatch("SetUserInfo", {name:'liucan'});
        this.content = '<p>abc</p><p><strong>fdhjfksdhfjds</strong></p>'
    },
}
</script>

<style lang='less' scoped>

</style>
