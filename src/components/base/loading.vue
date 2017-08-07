<template>
  <div class="loading flex-warp flex-middle flex-center">
    <div class="loader-box">
        <div class="loader-inner ball-clip-rotate-multiple">
          <div></div>
          <div></div>
        </div>
    </div>

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

<style scoped lang = 'scss' rel = 'stylesheet/scss'>
  @import "~common/css/base";
  @import "~common/css/loaders.css";
    .loading{
      position: fixed;
      left: 0;
      top: 0;
      bottom:0;
      right: 0;
      z-index: 999999;
      .loader-box{
        width: 60px;
        height: 60px;
        background-color: #000;
        border-radius: 0.5rem;
        .loader-inner{
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
</style>
