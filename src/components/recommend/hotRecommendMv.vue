<template>
  <div class="recommendMv">
    <div class="ret-title">热门推荐</div>
    <div class="swiper-container mvScroll">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="hot in datas" @click="jumpMv(hot.vid)">
          <div class="coverImg">
            <img v-lazy="hot.picurl" alt="" class="coverImg">
            <p class="playnum"><i class="iconfont icon-play-song"></i>{{hot.listennum | formatNum}}</p>
          </div>
          <div class="desc">
            <p class="ellipsis" v-text="hot.mvdesc"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import slider from 'components/base/slider';
  export default{
    props     : ['datas'],
    methods   : {
      init(){
        var mySwiper = new Swiper('.mvScroll', {
          slidesPerView: 2.4,
          freeMode     : true,
          spaceBetween : 10,
        })
      },
      jumpMv(vid){
          window.location.href=`https://y.qq.com/w/mv.html?ADTAG=newyqq.mv&vid=${vid}`
      }
    },
    components: {
      slider
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  .ret-title {
    font-size: $font-size-large;
    color: $color-text-l;
    text-align: center;
    line-height: 3.5rem;
    position: relative;
    &:after {
      font-family: "iconfont" !important;
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

  .mvScroll {
    padding: 0.5rem 0;
    .coverImg {
      position: relative;
      width: 100%;
      padding-top: 50%;
      .playnum{
        font-size: $font-size-medium-x;
        color: $color-text;
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        z-index: 100;
        .iconfont{
          font-size: $font-size-medium-x;
          margin-right: 0.3rem;
        }
      }
      img {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        vertical-align: middle;
        z-index: 10;
        padding: 0;
        border-radius: 0.3rem;
      }
    }
    .desc{
      padding: 0.2rem;
      font-size: $font-size-medium-x;
      color: $color-text-ll;
    }
  }
</style>
