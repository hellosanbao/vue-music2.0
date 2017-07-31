<template>
  <div class = "recommendList">
    <div class="ret-title">排行榜</div>
    <ul class="list">
      <router-link tag="li" :to="'/recommend/hot/'+rec.topID" v-for="rec in recommendList" class="flex-warp item flex-middle">
        <div class="avat"><img v-lazy = "rec.pic" alt = ""></div>
        <div class="nr flex-con">
          <h3>{{rec.ListName}}</h3>
          <div class="tip flex-warp flex-between">
            <div>播放量{{rec.listennum | formatNum}}</div>
          </div>
        </div>
        <div class="time">{{rec.showtime}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>

  export default{
    props  : {
      recommendList: {
        type   : Array,
        default: []
      }
    }
  }
</script>

<style scoped lang = "scss" rel = "stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  .ret-title{
    font-size: $font-size-large;
    color: $color-text-l;
    text-align: center;
    line-height: 3.5rem;
    position: relative;
    &:after{
      font-family:"iconfont" !important;
      content: "\e642";
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      height: 3.5rem;
      line-height: 3.5rem;
      width: 3rem;
      text-align: center;
      color: $color-text-d;
    }
  }
  .list{
    margin-bottom: 1rem;
    .item{
      padding: 1rem 1rem 1rem 0;
      margin-left: 1rem;
      @include border-1px-b();
      &:last-child:after{
        display: none;
      }
      .avat{
        width: 4rem;
        height: 4rem;
        img{
          width: 100%;
          height: 100%;
        }
      },
      .nr{
        margin-left: 1rem;
        h3{
          font-weight: 400;
          font-size: $font-size-big;
          color: $color-text-ll;
        }
      .tip{
        font-size: $font-size-medium;
        color: $color-text-i;
        margin-top: 0.5rem;
      }
    }
    }
  }


</style>
