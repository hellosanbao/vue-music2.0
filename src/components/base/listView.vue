<template>
  <div class="singerSongList" @click="hideCtrl">
    <div class="head" ref="head">
      <div class="head-content flex-warp flex-middle">
        <i class="iconfont icon-Prev" onclick="history.go(-1)"></i>
        <p class="til flex-con">{{title}}</p>
        <i class="iconfont"></i>
      </div>
    </div>
    <div class="list-cover" ref="listCover" :style="pic">
      <div class="play-rand"><i class="iconfont icon-play-song"></i>随机播放全部</div>
    </div>
    <div class="head-tab flex-warp" ref="headTab" v-show="false"></div>
    <scroll :top="top" ref="scroll"
            class="scroll-singerSongList"
            @scroll="centerScroll"
            :lisenScroll='lisenScroll'
            :class="{hide:false}">
      <!--<div class="fixed-cover"></div>-->
      <div style="background-color: #fff">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="list-content">
              <ul class="list">
                <li class="item" v-for="(data,index) in resdatalist" @click="selectPlay(data,datalist,index)">
                  <div class="flex-warp flex-middle">
                    <div class="flex-con">
                      <div class="name">{{data.songname}}</div>
                      <div class="author"><span>{{singerStr(data.singer)}}</span></div>
                    </div>
                    <div class="list-edit" @click.stop="showCtrl(data)"><i class="iconfont icon-gengduo"></i></div>
                  </div>
                  <transition name="slideInRight">
                    <div class="edit-warp flex-warp flex-middle" v-if="data.isShowCtrl" @click.stop>
                      <div class="left flex-warp flex-middle flex-con">
                        <div class="edit-item">
                          <i class="iconfont icon-add" @click.stop="addPlayList(data)"></i> <br>添加
                         </div>
                        <div class="edit-item" :class="{active:data.isCollect}"
                                                @click.stop="addCollect(data)">
                          <i class="iconfont icon-aixin"></i> <br>收藏
                        </div>
                        <!--<div class="edit-item"><i class="iconfont icon-ljt"></i> <br>删除</div>-->
                      </div>
                      <div class="right flex-warp flex-middle" @click="data.isShowCtrl=false">
                        <i class="iconfont icon-close"></i>
                      </div>
                    </div>
                  </transition>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/base/scroll';
  import {fonts, prefixStyle,gdMusicData} from 'common/js/base';
  import {mapActions,mapGetters,mapMutations} from 'vuex';
  import $ from 'jquery';

  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('filter');
  export default{
    data(){
      return {
        top         : '0px',
        scrollY     : 0,
        lisenScroll : true,
        scrollHidden: false,
        singerName  : '',
      }
    },
    props     : {
      datalist: {
        type: Array,
        default(){
          return [];
        }
      },
      pic     : {
        type   : String,
        default: ''
      },
      title   : {
        type   : String,
        default: 'QQ音乐排行榜'
      }
    },
    updated(){
      this.$refs.scroll.refresh();
    },
    mounted(){
      this.$nextTick(function () {
        this.init();
      })
    },
    computed:{
      ...mapGetters(['myCollectIds']),
      resdatalist(){
        this.datalist.forEach((el)=>{
          if(el.isShowCtrl===undefined){
            this.$set(el,'isShowCtrl',false);
            this.$set(el,'isCollect',false);
          }
          if(this.myCollectIds.indexOf(el.songid)>=0){
              el.isCollect=true;
          }
        })
        return this.datalist;
      }
    },
    methods   : {
      ...mapActions(['dispatchcgflae']),
      ...mapMutations(['AddToMySongList','addToSongList']),
      init(){
        this.top = `${this.$refs.listCover.clientHeight}px`;
        fonts(() => {
          this.$refs.headTab.style.top = `${parseInt(this.top) - this.$refs.headTab.clientHeight}px`;
        });
        setTimeout(() => {
          fonts(() => {
            this.$refs.scroll.init();
          });
        }, 200)

      },
      addCollect(song){
        song.isCollect=!song.isCollect;
        var songMsg=gdMusicData(song);
        this.AddToMySongList(songMsg);
      },
      addPlayList(song){
        var songMsg=gdMusicData(song);
        this.addToSongList(songMsg);
      },
      showCtrl(data){
          this.hideCtrl();
          data.isShowCtrl=true;
      },
      hideCtrl(){
        this.datalist.forEach((el)=>{
          el.isShowCtrl=false;
        })
      },
      singerStr(data){
          var arr =[];
          data.forEach((el)=>{
              arr.push(el.name)
          })
        return arr.join('、');
      },
      selectPlay(songMsg,songList,index){
        var song=gdMusicData(songMsg);
        var list=[];
        songList.forEach((el)=>{
            list.push(gdMusicData(el));
        })
        this.dispatchcgflae({songMsg:song,songList:list,index})
      },
      centerScroll(pos){
        this.scrollY = pos.y;
      }
    },
    watch     : {
      scrollY(newVal){
        this.hideCtrl();
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
      scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  @import "../../../node_modules/swiper/dist/css/swiper.min.css";

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
      height: 4.5rem;
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
      background: url("../../common/img/logo@3x.png") no-repeat center/100% auto #fff;
      /*z-index: 10;*/
      .play-rand {
        position: absolute;
        left: 50%;
        bottom: 3rem;
        transform: translateX(-50%);
        color: $primary-text-color;
        font-size: $font-size-big-x;
        border: 1px solid $primary-text-color;
        border-radius: 1.5rem;
        padding: 0.2rem 1rem;
        .iconfont {
          margin-right: 0.5rem;
        }
      }
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
            position: relative;
            .list-edit{
              @include extend-click();
              .iconfont{
                font-size: 1.2rem;
                color: $color-text-i;
              }
            }
            .edit-warp {
              height: 5rem;
              background-color: #fff;
              position: absolute;
              left: -1rem;
              top: 0;
              width: calc(100% + 1rem);
              z-index: 10;
              box-shadow: 0 1px 10px 1px rgba(0, 0, 0, .1);
              .right{
                padding: 0 1rem;
                @include extend-click();
              }
              .edit-item {
                width: 5rem;
                text-align: center;
                color: $color-text-i;
                &.active{
                  .iconfont{
                    color: #d93f30;
                  }
                }
              }
            }
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
  .slideInRight-enter-active {
    transition: all .3s ease;
  }
  .slideInRight-leave-active {
    transition: all .3s ease;
  }
  .slideInRight-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-100%);
  }
  .slideInRight-leave-to{
    opacity: 0;
  }
</style>
