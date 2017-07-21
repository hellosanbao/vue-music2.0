<template>
  <div class="nav-content">
    <ul>
      <router-link tag="li" to="recommend"><span>推荐</span></router-link>
      <router-link tag="li" to="singer"><span>歌手</span></router-link>
      <router-link tag="li" to="hots"><span>排行</span></router-link>
      <!--<li><span>搜索</span></li>-->
    </ul>
  </div>
</template>

<script>

    export default{
        data(){
            return {}
        },
        methods: {
            init(){
                //..do sth
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
    .nav-content{
      background-color: #fff;
      height: 4rem;
      ul{
        @extend .flex-warp;
        @extend .flex-middle;
        li{
          @extend .flex-con;
          text-align: center;
          line-height: 4rem;
          font-size: $font-size-big-x;
          span{
            border-bottom: 2px solid transparent;
            box-sizing: border-box;
            padding: 0.5rem;
          }
        }
        .router-link-active{
          span{
            color: $primary-text-color;
            border-bottom-color: $primary-text-color;
          }
        }
      }
    }
</style>
