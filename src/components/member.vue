<template>
  <div class="member-component">
    <div class="head-cont">
      <div class = "header">
        <div class = "left" onclick="history.go(-1)"><i class = "iconfont icon-Prev"></i></div>
        <div class = "logo flex-con flex-warp flex-middle flex-center">我的收藏</div>
        <div class = "right" @click="clear" v-if="mySongList.length"><i class = "iconfont icon-ljt"></i></div>
      </div>
    </div>
    <div class="collect-list">
      <ul>
        <li class="item flex-warp flex-middle" v-for="(song,index) in mySongList" @click="selectSong(song,index)">
          <div class="msg flex-con">
            <div class="name" v-html="song.songname"></div>
            <div class="singer" v-html="singer(song.singer)">薛之谦</div>
          </div>
          <div class="add" @click.stop="addToSongList(song)"><i class="iconfont icon-add"></i></div>
          <div class="del" @click.stop="delFromMySongList(index)"><i class="iconfont icon-close"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex';
    import {gdMusicData} from 'common/js/base';
    export default{
        data(){
            return {}
        },
        computed:{
          ...mapState(['mySongList'])
        },
        methods: {
          ...mapActions(['dispatchcgflae']),
          ...mapMutations(['delFromMySongList','addToSongList','clearMySongList']),
          singer(singers){
            var arr =[];
            singers.forEach((el)=>{
              arr.push(el.name)
            })
            return arr.join('、');
          },
          selectSong(song,index){
            this.dispatchcgflae({
              songMsg:song,
              songList:this.mySongList,
              index
            })
          },
          clear(){
            var _this=this;
            layer.open({
              content: '确定要清空收藏吗？'
              ,btn: ['清空', '再想想']
              ,yes: function(index){
                _this.clearMySongList();
                layer.close(index);
              }
            });
          }
        }
    }
</script>

<style scoped lang = 'scss' rel = 'stylesheet/scss'>
  @import "~common/css/base";
  @import "~common/css/mixin";
  .member-component{
    position: fixed;
    left: 0;
    top:0;
    right:0;
    bottom:6rem;
    z-index: 9999;
    margin-top: 0!important;
    background-color: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .head-cont{
      position: fixed;
      left: 0;
      top:0;
      right: 0;
      z-index: 9999;
      .header {
        height: 5rem;
        box-shadow: 0 1px 1rem rgba(0,0,0,.1);
        .left, .right {
          color: $color-text-i;
          @include extend-click();
        }
        background-color: #fff;
        @extend .flex-warp;
        @extend .flex-middle;
        padding: 1rem;
        box-sizing: border-box;
        .logo {
          font-size: $font-size-large;
        }
        .logo-name {
          font-size: 2rem;
          font-weight: $font-size-large-x;
          color: $primary-text-color;
          font-family: 'Arial';
          margin-left: 0.5rem;
        }
      }
    }
    .collect-list{
      padding-top: 5rem;
      .item{
        @include border-1px-b();
        padding: 1rem 1rem 1rem 0;
        margin-left: 1rem;
        .msg{
          .name{
            font-size: 1.5rem;
          }
          .singer{
            font-size: $font-size-big;
            color: $color-text-l;
            margin-top: 0.5rem;
          }
        }
        .icon-add,.icon-close{
          color: $color-text-i;
          @include extend-click();
        }
        .icon-add{
          margin-right:1rem;
        }
      }
    }
  }
</style>
