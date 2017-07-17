<template>
  <div class="header">
    <div class="left">
      <i class="iconfont icon-user"></i>
    </div>
    <div class="logo">
      <img src = "../common/img/logo@3x.png" alt = "">
      <div class="logo-name">QQ音乐</div>
    </div>
    <div class="right">
      <i class="iconfont icon-cg-app-search"></i>
    </div>
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
<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  .header
  {
    .left,.right{
      color: $primary-text-color;
      @include extend-click();
    }
    background-color: $color-background;
    @extend .flex-warp;
    @extend .flex-middle;
    padding: 1rem;
    .logo{
      @extend .flex-warp;
      @extend .flex-middle;
      @extend .flex-center;
      @extend .flex-con;
      img{
        display:block;
        vertical-align: middle;
        width: 3.5rem;
      }
    }
    .logo-name{
      font-size: 2rem;
      font-weight: $font-size-large-x;
      color: $primary-text-color;
      font-family: 'Arial';
      margin-left: 0.5rem;
    }
  }
</style>
