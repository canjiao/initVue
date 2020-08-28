<template>
    <div class="user">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'user',
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
