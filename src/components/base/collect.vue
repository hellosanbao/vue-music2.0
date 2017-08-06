<template>
  <transition name="slideInUp">
    <div class="my-collect" v-if="isShowMySongList">
      <div class="play-auto"><i class="iconfont icon-play-song"></i>随机播放全部</div>
        <div class="collect-content">
          <ul class="song-list">
            <li class="item flex-warp flex-middle flex-between"
                v-for="(song,index) in songList"
                @click="select(song,index)" :class="{active:index===curSongIndex}">
              <div class="name" v-html="song.songname"></div>
              <div class="icon" @click.stop="delFromSongList(index)"><i class="iconfont icon-ljt"></i></div>
            </li>
          </ul>
          <div class="close-btn" @click="toggleShowMySongList"><i class="iconfont icon-close"></i></div>
        </div>
    </div>
  </transition>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
    export default{
      computed:{
        ...mapState(['songList','isShowMySongList','curSongIndex','songMsg'])
      },
      methods:{
        ...mapMutations(['toggleShowMySongList','delFromSongList','changeCurSongIndex']),
        ...mapActions(['dispatchcgflae']),
        select(song,index){
          this.dispatchcgflae({songMsg:song,songList:this.songList,index})
        }
      },
      mounted(){
        this.songList.forEach((el,i)=>{
          if(el.songid===this.songMsg.songid){
            this.changeCurSongIndex(i)
          }
        })
      },
      watch:{
        songList(nval){
            nval.forEach((el,i)=>{
                if(el.songid===this.songMsg.songid){
                    this.changeCurSongIndex(i)
                }
            })
        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  .my-collect{
    position: fixed;
    left: 0;
    top:0;
    bottom:6rem;
    right:0;
    z-index: 999999;
    background-color: rgba(0,0,0,.7);
    .play-auto{
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 20rem;
      padding: 0.5rem 2rem;
      border:2px solid #d7d7d7;
      border-radius: 4rem;
      color: #fff;
      font-size: 1.4rem;
      .iconfont{
        margin-right: 0.5rem;
      }
    }
    .collect-content{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      height: 40rem;
      .song-list{
        height: 35rem;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .item{
          height: 4rem;
          padding: 0 1rem 0 0;
          margin-left: 1rem;
          font-size: 1.4rem;
          &.active{
            color: $primary-text-color;
          }
          @include border-1px-b();
          .iconfont{
            @include extend-click();
          }
        }
      }
      .close-btn{
        text-align: center;
        line-height: 5rem;
        height: 5rem;
        color: #fff;
        background-color: $color-text-ll;
        @include border-1px-b('top');
      }
    }
  }
  .slideInUp-enter-active,.slideInUp-leave-active{
    transition: all .3s ease;
    .collect-content{
      transition: all .3s ease;
    }

  }
  .slideInUp-enter, .slideInUp-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
    .collect-content{
      transform: translateY(100%);
    }

  }
</style>
