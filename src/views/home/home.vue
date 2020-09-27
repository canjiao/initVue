<template>
    <div style="height:1500px">
        首页{{10 | formatAmount}}
        <Button type="primary" @click="$router.push('/user/orderList')">进入用户订单列表页</Button>
        <Input v-model.number="val" v-number></Input>
        <span v-scrollTo v-fixed="{left:100,top:500}">返回顶部</span>

        <PrintLodop :visible.sync="visible" @print="print" @print-newPage="printNewPage"></PrintLodop>
        <Button type="primary" @click="visible=true">点击打印</Button>
    </div>
</template>

<script>
import PrintLodop from '@/components/PrintModal/PrintLodop'
export default {
    name: 'home',
    data () {
        return {
            val:'',
            visible:false,
        }
    },
    components: {
        PrintLodop
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
        }
    },
    created(){
        this.$api.common.login({phone:'123'})
        this.$storage.Cookie.set('name','liucan')
        this.$store.dispatch("SetUserInfo", {name:'liucan'});
    },
}
</script>

<style lang='less' scoped>

</style>
