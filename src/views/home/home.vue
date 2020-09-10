<template>
    <div style="height:1500px">
        首页{{10 | formatAmount}}
        <Button type="primary" @click="$router.push('/user/orderList')">进入用户订单列表页</Button>
        <Input v-model.number="val" v-number></Input>
        <span v-scrollTo v-fixed="{left:100,top:500}">返回顶部</span>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            val:''
        }
    },
    components: {},
    filters: {},
    watch: {},
    computed: {},
    methods: {},
    created(){
        this.$api.common.login({phone:'123'})
        this.$storage.Cookie.set('name','liucan')
        this.$store.dispatch("SetUserInfo", {name:'liucan'});
    },
}
</script>

<style lang='less' scoped>

</style>
