<template>
  <div class = "header">
    <router-link to = "/member" id='main-member' tag = "div" class = "left">
      <i class = "iconfont icon-collect"></i>
    </router-link>
    <div class = "logo">
      <img src = "../common/img/logo@3x.png" alt = "">
      <div class = "logo-name">QQ音乐</div>
    </div>
    <router-link to = "/search" id='main-search' tag = "div" class = "right">
      <i class = "iconfont icon-cg-app-search"></i>
    </router-link>
  </div>
</template>

<script>

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss" rel = "stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";

  .header {
    .left, .right {
      color: $primary-text-color;
      @include extend-click();
    }
    background-color: $color-background;
    @extend .flex-warp;
    @extend .flex-middle;
    padding: 1rem;
    box-sizing: border-box;
    .logo {
      @extend .flex-warp;
      @extend .flex-middle;
      @extend .flex-center;
      @extend .flex-con;
      img {
        display: block;
        vertical-align: middle;
        height: 3.5rem;
      }
    }
    .logo-name {
      font-size: 2rem;
      font-weight: $font-size-large-x;
      color: $primary-text-color;
      font-family: 'Arial';
      margin-left: 0.5rem;
    }
  }
</style>
