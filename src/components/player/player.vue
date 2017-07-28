<template>
  <div class="player-content">
    <div class="full-play" v-if="fullPlay">
      <div class="full-content">
        <div class="full-bg" :style="bgPic"></div>
        <div class="header flex-warp flex-middle flex-between" @click="closeFullPlay">
          <i class="left-con iconfont icon-down pr"></i>
          <div class="title">{{songMsg.musicData.songname}}</div>
          <!-- icon-collect-default -->
          <i class="right-icon iconfont icon-aixin pr"></i>
        </div>
        <div class="singer">{{singers}}</div>
        <div class="player-cover active">
          <img :src="pic" alt="">
        </div>
        <div class="lryc">暂无歌词</div>
        <div class="rander-content flex-warp flex-middle">
          <span class="cur">{{curTime | formatTime}}</span>
          <div class="rander flex-con" ref="rander" @click="changeCurTime($event)">
            <div class="cur-rander" :style="{width: playedProportion}"></div>
            <div class="cicle" :style="{left:playedProportion}"></div>
          </div>
          <span class="end">{{songMsg.musicData.interval | formatTime}}</span>
        </div>
        <div class="play-ctrl flex-warp flex-middle">
          <div class="play-typ"><i class="iconfont icon-loop"></i></div>
          <div class="play-btn flex-con flex-warp flex-middle flex-between">
            <i class="iconfont icon-prev-song"></i>
            <i class="iconfont icon-play-song"></i>
            <!--<i class="iconfont icon-pasue-play"></i>-->
            <i class="iconfont icon-next-song"></i>
          </div>
          <div class="menu"><i class="iconfont icon-bflb"></i></div>
        </div>
      </div>
    </div>
    <audio ref='audioplay' :src="musicUrl" @play="play" @ended="end" @timeupdate="timeupdate"></audio>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default{
    data(){
      return {
        curTime:0,
        playedProportion:0,
        touchBtn:false

      }
    },
    computed: {
      ...mapState(['fullPlay', 'songMsg']),
      singers(){
          var arr=[];
          this.songMsg.musicData.singer.forEach((el)=>{
            arr.push(el.name);
          })
          return arr.join('、')
      },
      musicUrl(){
          if(this.songMsg.musicData){
            return `http://ws.stream.qqmusic.qq.com/${this.songMsg.musicData.songid}.m4a?fromtag=46`;
          }
      },
      pic(){
        return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.songMsg.musicData.singer[0].mid}.jpg?max_age=2592000`;
      },
      bgPic(){
          return `background:url(${this.pic}) no-repeat center/cover`
      }
    },
    methods : {
      ...mapMutations(['closeFullPlay']),
      play(){
        console.log('播放了')
      },
      end(){
        console.log('结束了')
      },
      timeupdate(){
          this.curTime=Math.floor(this.$refs.audioplay.currentTime);
          if(!this.touchBtn){
            this.playedProportion=this.curTime/this.songMsg.musicData.interval;
            this.playedProportion=this.playedProportion*100+'%';
          }

      },
      changeCurTime(event){
        this.playedProportion=(event.pageX/this.$refs.rander.clientWidth)*100+'100%';
        console.log(this.playedProportion)
      }
    },
    watch:{
      songMsg(){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audioplay.play();
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";

  .full-play {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background-color: #fff;
    .full-content {
      position: relative;
      height: 100%;
      width: 100%;
      background-color: $color-text-l;
      .full-bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.8;
        background: url("../../common/img/logo@3x.png") no-repeat center/cover $primary-text-color;
        -webkit-filter: blur(2rem);
        transform: scale(1.2);
      }
      .header {
        height: 4rem;
        line-height: 4rem;
        color: #fff;
        position: relative;
        padding: 0 1rem;
        .left-con {
          @include extend-click();
          z-index: 2;
        }
        .right-icon {
          z-index: 2;
          @include extend-click();
          font-size: 2rem;
          margin-right: 0.5rem;
          &.icon-aixin {
            color: #d93f30;
          }
        }
        .title {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 4rem;
          font-size: 1.7rem;
          z-index: 1;
        }
      }
      .singer {
        text-align: center;
        color: #ffffff;
        font-size: 1.2rem;
      }
      .player-cover {
        width: 28rem;
        height: 28rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 3rem auto 0;
        border: 0.7rem solid #d7d7d7;
        background-color: #fff;
        &.active {
          animation: rot 20s infinite linear;
        }
        img {
          display: block;
          height: 100%;
          width: 100%;
          vertical-align: middle;
        }
      }
      .lryc {
        font-size: 1.4rem;
        color: #fff;
        text-align: center;
        line-height: 4.5rem;
        padding: 1rem;
      }
      .rander-content {
        padding: 0 2rem;
        .cur, .end {
          font-size: 1.1rem;
          color: #fff;
        }
        .rander {
          height: 3px;
          background-color: $color-text-d;
          margin: 0 2rem;
          position: relative;
          & .cicle {
            content: "";
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: $primary-text-color;
            position: absolute;
            top: 0;
            margin-top: calc(-0.75rem + 2px);
            /*transform: translateY(calc(-50% - 2px)) translateX(10rem);*/
          }
          .cur-rander {
            height: 100%;
            background-color: $primary-text-color;
          }
        }
      }
      .play-ctrl {
        padding: 2rem;
        .play-typ, .menu {
          .iconfont {
            font-size: 2.5rem;
            color: #dfdfdf;
          }
        }
        .play-btn {
          margin: 0 3rem;
          color: $primary-text-color;
          .icon-prev-song, .icon-next-song {
            font-size: 5rem;
          }
          .icon-play-song, .icon-pasue-play {
            font-size: 7.5rem;
          }
        }
      }
    }

  }

  @keyframes rot {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
