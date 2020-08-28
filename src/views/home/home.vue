<template>
    <div>
        首页
        <Button type="primary" @click="$router.push('/user/orderList')">进入用户订单列表页</Button>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
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
