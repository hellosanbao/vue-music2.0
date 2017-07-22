<template>
  <div class="singerSongList">
    <div class="head" ref="head" style="background-color: #fff">
      <div class="head-content flex-warp flex-middle">
        <i class="iconfont icon-Prev"></i>
        <p class="til flex-con">薛之谦</p>
        <i class="iconfont"></i>
      </div>
    </div>
    <div class="list-cover" ref="listCover"></div>
    <scroll :top="top" ref="scroll"
            class="scroll-singerSongList"
            @scroll="centerScroll"
            :lisenScroll='lisenScroll'
            :class="{hide:scrollHidden}"
    >
      <!--<div class="fixed-cover"></div>-->
      <div style="background-color: #fff">
        <div class="head-tab flex-warp">
          <div class="item active flex-con" @click="change(0)">
            <span>歌曲</span>
          </div>
          <div class="item flex-con" @click="change(1)">
            <span>mv</span>
          </div>
        </div>
        <slider ref="slide" :slideParams="slideParams" wrap="list-tab">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="list-content">
                <ul class="list">
                  <li class="item flex-warp flex-middle" v-for="(song,index) in songList">
                    <div>
                      <div class="name">东北吃货进行曲{{index}}</div>
                      <div class="author">德玛西亚皇子</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="swiper-slide">mv</div>
          </div>
        </slider>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/base/scroll';
  import slider from 'components/base/slider';
  import jsonp from 'common/js/jsonp';
  import {fonts} from 'common/js/base';
  import {recommend, options} from '@/apiConfig';
  import $ from 'jquery';
  export default{
    data(){
      return {
        slideParams: {
          onSlideChangeStart: function (swiper) {
            var index = swiper.activeIndex;
            $(".head-tab .item").eq(index).addClass("active").siblings('.item').removeClass('active');
          }
        },
        songList   : [],
        top:'0px',
        scrollY:0,
        lisenScroll:true,
        scrollHidden:false,
      }
    },
    mounted(){
      this.init();
    },
    methods   : {
      init(){
        this.getSongList();
        this.$refs.slide.init();
      },
      change(ind){
        this.$refs.slide.slideTo(ind, 300, true);
      },
      getSongList(){
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        let data = Object.assign({}, recommend, {
          loginUin   : 0,
          hostUin    : 0,
          notice     : 0,
          platform   : 'yqq',
          needNewCode: 0,
          singermid  : this.$route.params.id,
          order      : 'listen',
          begin      : 0,
          num        : 30,
          songstatus : 1,
        })
        jsonp(url, data, options).then((res) => {
          if (res.code == 0) {
            this.songList = this.songList.concat(res.data.list)
            this.top=`${this.$refs.listCover.clientHeight}px`
            setTimeout(() => {
              fonts(() => {
                this.$refs.scroll.init();
              });
            }, 200)
          }
        })
      },
      centerScroll(pos){
          this.scrollY=pos.y;
      }
    },
    watch:{
      scrollY(newVal){
        let warp=this.$refs.listCover.clientHeight-this.$refs.head.clientHeight
        if(-newVal>(warp)){
          this.$refs.head.style.zIndex=99999;
        }else{

        }
      }
    },
    components: {
      scroll,
      slider
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  @import "../../node_modules/swiper/dist/css/swiper.min.css";

  .singerSongList {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 10000;
    .head {
      color: $primary-text-color;
      font-size: $font-size-large;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 3.5rem;
      line-height: 3.5rem;
      z-index: 1000;
      .head-content {
        text-align: center;
        position: relative;
        height: 100%;
        width: 100%;
        .iconfont {
          display: block;
          width: 3rem;
        }
      }
    }
    .list-cover {
      position: relative;
      width: 100%;
      padding-top: 70%;
      background: url("../common/img/logo@3x.png") no-repeat center top/100% auto #fff;
      /*z-index: 10;*/
    }
    .hide{
      overflow: hidden;
    }
    .bg-cover{
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #f60;
    }
    .scroll-singerSongList{
      /*background-color: #fff;*/
      .head-tab {
        height: 4rem;
        @include border-1px-b();
        .item {
          font-size: $font-size-large;
          color: $color-text-ll;
          text-align: center;
          span {
            border-bottom: 2px solid transparent;
            display: inline-block;
            height: 4rem;
            line-height: 4rem;
            box-sizing: border-box;
            padding: 0 1rem;
          }
          &.active {
            color: $primary-text-color;
            span {
              border-bottom: 2px solid $primary-text-color;
            }
          }
        }

      }
      .list-content {
        .list {
          .item {
            padding: 0.5rem;
            height: 4rem;
            @include border-1px-b('bottom', #f0f0f0);
            font-weight: 300;
            padding-right: 1rem;
            margin-left: 1rem;
            .name {
              font-size: $font-size-big;
              color: $color-text-v;
            }
            .author {
              font-size: $font-size-medium;
              color: $color-text-l;
              margin-top: 0.3rem;
            }
          }
        }
      }
    }
  }
</style>
