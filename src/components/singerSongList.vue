<template>
  <div class="singerSongList">
    <div class="head" ref="head">
      <div class="head-content flex-warp flex-middle">
        <i class="iconfont icon-Prev" onclick="history.go(-1)"></i>
        <p class="til flex-con">{{singerName}}</p>
        <i class="iconfont"></i>
      </div>
    </div>
    <div class="list-cover" ref="listCover" :style="singerPic"></div>
    <div class="head-tab flex-warp" ref="headTab">
      <div class="item flex-con" :class="{active:slideIndex==0}" @click="change(0)">
        <span>歌曲</span>
      </div>
      <div class="item flex-con" :class="{active:slideIndex==1}" @click="change(1)">
        <span>mv</span>
      </div>
    </div>
    <scroll :top="top" ref="scroll"
            class="scroll-singerSongList"
            @scroll="centerScroll"
            :lisenScroll='lisenScroll'
            :class="{hide:scrollHidden}"
    >
      <!--<div class="fixed-cover"></div>-->
      <div style="background-color: #fff">
        <slider ref="slide" wrap="list-tab" @SlideChangeStart="slideChange" :slideParams="slideParam">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="list-content">
                <ul class="list">
                  <li class="item flex-warp flex-middle"
                      v-for="(song,index) in songList"
                      @click="selectPlay(song,songList,index)">
                    <div>
                      <div class="name">{{song.musicData.songname}}</div>
                      <div class="author"><span v-for="singer in song.musicData.singer">{{singer.name}} </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="swiper-slide">
              <ul class="mv-list">
                <li class="item flex-warp flex-middle" v-for="mv in mvList" @click="jumpMv(mv.vid)">
                  <div class="avat">
                    <img v-lazy="mv.pic" alt="">
                    <p class="playnum"><i class="iconfont icon-play-song"></i>{{mv.listenCount | formatNum}}</p>
                  </div>
                  <div class="nr flex-con">
                    <p class="title ellipsis">{{mv.title}}</p>
                    <p class="name ellipsis">{{mv.singer_name}}</p>
                  </div>
                </li>
              </ul>
            </div>
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
  import {fonts, prefixStyle, musicData} from 'common/js/base';
  import {recommend, options} from '@/apiConfig';
  import $ from 'jquery';
  import {mapMutations, mapActions} from 'vuex';

  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('filter');
  export default{
    data(){
      return {
        songList    : [],
        mvList      : [],
        top         : '0px',
        scrollY     : 0,
        lisenScroll : true,
        scrollHidden: false,
        singerName  : '',
        singerPic   : '',
        slideParam  : {
          autoHeight: true,
        },
        slideIndex  : 0,
        curScrollY  : [0, 0],
      }
    },
    mounted(){
      this.init();
    },
    methods   : {
      ...mapActions(['dispatchcgflae']),
      ...mapMutations(['HideLoading','ShowLoading']),
      init(){
        this.ShowLoading();
        this.getSongList();
        this.getMvList();
        this.$refs.slide.init();
      },
      selectPlay(songMsg, songList, index){
        var song = musicData(songMsg);
        var list = [];
        songList.forEach((el) => {
          list.push(musicData(el));
        })
        this.dispatchcgflae({songMsg: song, songList:list, index})
      },
      change(ind){
        this.$refs.slide.slideTo(ind, 300, true);
      },
      slideChange(swiper){
//          this.$refs.scroll.style.height=this.$refs.tabItem[this.slideIndex].clientHeight;
//        console.log(this.$refs.tabItem)
        this.$refs.scroll.refresh();
        this.slideIndex = swiper.activeIndex;
        let t = this.$refs.listCover.clientHeight - this.$refs.head.clientHeight - this.$refs.headTab.clientHeight
        if (-this.scrollY > t) {
          this.$refs.scroll.scrollTo(0, this.curScrollY[this.slideIndex], 0, true);
        }
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
            this.singerName = res.data.singer_name;
            let pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`;
            this.singerPic = `background:url(${pic}) no-repeat center top/100% auto #fff`;
            this.songList = this.songList.concat(res.data.list);
            //坐标相关计算
            this.top = `${this.$refs.listCover.clientHeight}px`;
            this.$refs.headTab.style.top = `${parseInt(this.top) - this.$refs.headTab.clientHeight}px`;
            for (let i = 0; i < this.curScrollY.length; i++) {
              this.curScrollY[i] = -(this.$refs.listCover.clientHeight - this.$refs.head.clientHeight - this.$refs.headTab.clientHeight);
            }
            setTimeout(() => {
                this.HideLoading();
              fonts(() => {
                this.$refs.scroll.init();
              });
            }, 200)
          }
        })
      },
      jumpMv(vid){
        window.location.href = `https://y.qq.com/w/mv.html?ADTAG=newyqq.mv&vid=${vid}`
      },
      getMvList(){
        let url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'
        let data = Object.assign({}, recommend, {
          cid        : 205360581,
          singermid  : this.$route.params.id,
          order      : 'listen',
          begin      : 0,
          num        : 15,
          loginUin   : 0,
          hostUin    : 0,
          notice     : 0,
          platform   : 'yqq',
          needNewCode: 0,
        })
        jsonp(url, data, options).then((res) => {
          this.mvList = this.mvList.concat(res.data.list)
        })

      },
      centerScroll(pos){
        this.scrollY = pos.y;
        if (-pos.y >= this.$refs.listCover.clientHeight - this.$refs.head.clientHeight - this.$refs.headTab.clientHeight)
          this.curScrollY[this.slideIndex] = Math.ceil(pos.y);
      }
    },
    watch     : {
      scrollY(newVal){
        let warp = this.$refs.listCover.clientHeight - this.$refs.head.clientHeight;
        var opactiy = -newVal / warp > 1 ? 1 : -newVal / warp;
        this.$refs.head.style.background = `rgba(255,255,255,${opactiy})`;
        let headTop = this.$refs.listCover.clientHeight + newVal - this.$refs.headTab.clientHeight;
        headTop = headTop < this.$refs.head.clientHeight ? this.$refs.head.clientHeight : headTop;
        this.$refs.headTab.style.top = `${headTop}px`;
        if (newVal > 0) {
          var blur = -opactiy * 20;
          var rote = 1 + (-opactiy);
          //考虑到流畅度暂时放弃
//          this.$refs.listCover.style[backdrop] = `blur(${blur}px)`;
          this.$refs.listCover.style[transform] = `scale(${rote})`;
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
      z-index: 99999;
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
      padding-top: 80%;
      background: url("../common/img/logo@3x.png") no-repeat center top/100% auto #fff;
      /*z-index: 10;*/
    }
    .hide {
      overflow: hidden;
    }
    .bg-cover {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #f60;
    }
    .head-tab {
      height: 4rem;
      position: fixed !important;
      width: 100%;
      left: 0;
      z-index: 9999;
      background-color: #fff;
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
    .scroll-singerSongList {
      /*background-color: #fff;*/
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
      .mv-list {
        .item {
          padding: 0.5rem 1rem;
          .avat {
            position: relative;
            width: 10rem;
            height: 5.64rem;
            img {
              width: 100%;
              height: 100%;
            }
            .playnum {
              position: absolute;
              right: 1rem;
              bottom: 0;
              height: 2rem;
              line-height: 2rem;
              z-index: 99;
              color: #fff;
              .iconfont {
                font-size: $font-size-big;
                margin-right: 0.3rem;
              }
            }
          }
          .nr {
            padding: 0 1rem;
            .title {
              font-size: $font-size-big-x;
              color: $color-text-v;
            }
            .name {
              font-size: $font-size-big;
              color: $color-text-l;
              margin-top: 0.5rem;
            }
          }
        }
      }
    }
  }
</style>
