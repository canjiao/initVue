<template>
  <div>
    订单列表
    <Button type="primary" @click="$router.push('/user/setCenter')">去设置中心</Button>
    <Button type="dashed" @click="$router.go(-1)">返回</Button>
    <Input type="text"></Input>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  components: {},
  filters: {},
  watch: {},
  computed: {},
  methods: {},
  created(){},
}
</script>

<style lang='less' scoped>

</style>
