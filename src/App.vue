<template>
  <div id="app">
    
    <!-- web页面 -->
    <router-view v-if="config.projectType==='web'"></router-view>

    <!-- h5页面 有路由跳转从左到右的动画 -->
    <transition name="left" v-if="config.projectType==='h5'">
      <router-view key="body" style="width:100%"></router-view>
    </transition>

  </div>
</template>

<script>
import config from '@/utils/config'
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow-x: auto;
}
#app {
  width: 100%;
  height: 100%;
}

.left-enter {
  opacity: 0;
  transform: translate(100%, 0);
}
.left-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
  position: absolute;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.5s linear;
}
</style>
