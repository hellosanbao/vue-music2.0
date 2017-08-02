<template>
  <div class = "player-content">
    <transition name="slideInRight">
      <div class = "full-play" v-if = "fullPlay">
        <div class = "full-content">
          <div class = "full-bg" :style = "bgPic"></div>
          <div class="top">
            <div class = "header flex-warp flex-middle flex-between">
              <i class = "left-con iconfont icon-down pr"  @click = "closeFullPlay"></i>
              <div class = "title">{{songMsg.songname}}</div>
              <!-- icon-collect-default -->
              <i class = "right-icon iconfont icon-aixin pr"></i>
            </div>
            <div class = "singer">{{singers}}</div>
          </div>
          <div class = "player-cover" :class="{active:isPlay}">
            <img :src = "pic" alt = "">
          </div>
          <div class="bottom">
            <div class = "lryc">暂无歌词</div>
            <div class = "rander-content flex-warp flex-middle">
              <span class = "cur">{{curTime | formatTime}}</span>
              <div class = "rander flex-con" ref = "rander" @click = "changeTime($event)"
                   @touchmove = "moveCurTime($event)">
                <div class = "cur-rander" :style = "{width: playedProportion}"></div>
                <div class = "cicle" :style = "{left:playedProportion}"
                     @touchstart = "changetouchBtn(true)"
                     @touchend = "changetouchBtn(false)"></div>
              </div>
              <span class = "end">{{songMsg.interval | formatTime}}</span>
            </div>
            <div class = "play-ctrl flex-warp flex-middle">
              <div class = "play-typ"><i class = "iconfont" :class = "palyState" @click="cheangePlayType"></i></div>
              <div class = "play-btn flex-con flex-warp flex-middle flex-between">
                <i class = "iconfont icon-prev-song" @click = "prev()"></i>
                <i class = "iconfont"
                   :class = "{'icon-pasue-play':isPlay,'icon-play-song':!isPlay}"
                   @click = "changePlayeState(!isPlay)"></i>
                <i class = "iconfont icon-next-song" @click = "next()"></i>
              </div>
              <div class = "menu" @click="toggleShowMySongList"><i class = "iconfont icon-bflb"></i></div>
            </div>
          </div>

        </div>
      </div>
    </transition>

    <transition name="slideInUp">
      <div class="mini-play" v-if = "!fullPlay" @click="openfullPlay">
        <div class="mini-play-content  flex-warp flex-middle">
          <div class="avat" :class="{active:isPlay}"><img :src="pic" alt=""></div>
          <div class="msg flex-con">
            <p class="name" v-html="songMsg.songname"></p>
            <p class="singer" v-html="singers"></p>
          </div>
          <div class="progress"></div>
          <div class = "menu" @click.stop="toggleShowMySongList"><i class = "iconfont icon-bflb"></i></div>
        </div>
      </div>
    </transition>

    <audio ref = 'audioplay' :src = "musicUrl" @play = "play" @ended = "end" @timeupdate = "timeupdate"></audio>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {musicData} from 'common/js/base';
  export default{
    data(){
      return {
        curTime         : 0, //当前播放时间
        playedProportion: 0, //进度条百分比
        Proportion      : 0, //进度条比例
        touchBtn        : false, //是否按住range按钮

      }
    },
    computed: {
      ...mapState(['fullPlay', 'songMsg', 'isPlay', 'songList', 'curSongIndex','palyTypeArr','playType']),
      palyState(){
        return   this.palyTypeArr[this.playType];
      },
      singers(){
        var arr = [];
        if(this.songMsg.singer){
          this.songMsg.singer.forEach((el) => {
            arr.push(el.name);
          })
          return arr.join('、')
        }
        return '未知歌手'
      },
      musicUrl(){
        if (this.songMsg) {
          return `http://ws.stream.qqmusic.qq.com/${this.songMsg.songid}.m4a?fromtag=46`;
        }
      },
      pic(){
        return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.songMsg.albummid}.jpg?max_age=2592000`;
      },
      bgPic(){
        return `background:url(${this.pic}) no-repeat center/cover`
      }
    },
    methods : {
      ...mapMutations(['closeFullPlay', 'changePlayeState', 'changeCurSongIndex', 'selectPlaySong','cheangePlayType','toggleShowMySongList','openfullPlay']),
      play(){
        this.changePlayeState(true);
      },
      next(){
        if (this.curSongIndex < this.songList.length - 1) {
          this.changeCurSong(1);
        } else {
          this.changeCurSongIndex(0);
          this.selectPlaySong(this.songList[this.curSongIndex]);
        }

      },
      prev(){
        if (this.curSongIndex > 0) {
          this.changeCurSong(-1);
        } else {
          this.changeCurSongIndex(this.songList.length - 1);
          this.selectPlaySong(this.songList[this.curSongIndex]);
        }
      },
      end(){
        this.changeCurSong()
      },
      changeCurSong(tip){
          var _this=this;
        var len = this.songList.length - 1;
        if (!tip) {
          switch (this.palyTypeArr[this.playType]) {
            case 'icon-loop':
              if (this.curSongIndex < this.songList.length - 1) {
                this.changeCurSongIndex(this.curSongIndex + 1);
              } else {
                this.changeCurSongIndex(0);
              }
              break;
            case 'icon-sjbf':
                function a() {
                  var ind=parseInt(len * Math.random());
                  if(ind==_this.curSongIndex){
                      a()
                  }
                  return ind;
                }
              this.changeCurSongIndex(a());
              break;
            case 'icon-dqxh':
              this.changeCurSongIndex(this.curSongIndex);
              break;
          }
        } else {
          this.changeCurSongIndex(this.curSongIndex + tip);
        }

        var songMsg = this.songList[this.curSongIndex];
        this.selectPlaySong(songMsg);
        this.timer = setTimeout(() => {
          this.$refs.audioplay.play();
        }, 500)
      },
      timeupdate(){
        this.curTime = Math.floor(this.$refs.audioplay.currentTime);
        if (!this.touchBtn) {
          this.playedProportion = this.curTime / this.songMsg.interval;
          this.playedProportion = this.playedProportion * 100 + '%';
        }

      },
      changeProportion(event){
        var event = event.touches ? event.touches[0] : event;
        var Proportion = (event.pageX - this.$refs.rander.offsetLeft) / this.$refs.rander.clientWidth;
        if (Proportion <= 0) {
          Proportion = 0
        } else if (Proportion >= 1) {
          Proportion = 1
        }
        this.playedProportion = Proportion * 100 + '%';
        return Proportion;
      },
      changeTime(event){
        var Proportion = this.changeProportion(event);
        this.$refs.audioplay.currentTime = Proportion * this.songMsg.interval;
      },
      moveCurTime(event){
        if (this.touchBtn) {
          this.Proportion = this.changeProportion(event);
        }
      },
      changetouchBtn(flg){
        this.touchBtn = flg;
        if (!flg) {
          this.$refs.audioplay.currentTime = this.Proportion * this.songMsg.interval;
        }
      }
    },
    watch   : {
      songMsg(){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audioplay.play();
        }, 1000)
      },
      isPlay(nval){
        if (nval) {
          this.$refs.audioplay.play();
        } else {
          this.$refs.audioplay.pause();
        }
      }
    }
  }
</script>

<style scoped lang = "scss" rel = "stylesheet/scss">
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
            display: block;
            width: 3rem;
            text-align: center;
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

  .mini-play{
    height: 6rem;
    box-shadow: 0 -1px 1.5rem rgba(0,0,0,.1);
    background-color: #fff;
    position: fixed;
    left:0;
    bottom:0;
    width: 100%;
    z-index: 99999;
    .mini-play-content{
      height: 6rem;
      padding: 0 1rem;
      margin: 0!important;
      .avat{
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        border: 2px solid #d7d7d7;
        overflow: hidden;
        &.active {
          animation: rot 20s infinite linear;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      },
      .msg{
      margin-left: 1rem;
      .name{
        font-size: 1.3rem;
      }
      .singer{
        color: $color-text-i;
        font-size: 1rem;
      }
    }
      .menu{
        .iconfont{
          @include extend-click();
          font-size: 2.5rem;
          color: $color-text-i;
        }

      }
    }
  }

  .slideInRight-enter-active,.slideInRight-leave-active {
    transition: all .3s ;
    .top, .bottom{
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  .slideInRight-enter, .slideInRight-leave-to{
    opacity: 0;
  .top{
    transform: translate3d(0, -100px, 0)
  }
  .bottom{
    transform: translate3d(0, 100px, 0)
  }
  }
  .slideInUp-enter-active,.slideInUp-leave-active{
    transition: all .3s ;
  }
  .slideInUp-enter, .slideInUp-leave-to{
    transform: translate3d(0, 100%, 0)
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
