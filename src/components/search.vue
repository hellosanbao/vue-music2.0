<template>
  <div class = "search-component">
    <div class = "search-header flex-warp flex-middle">
      <div class = "back" onclick = "history.go(-1)"><i class="iconfont icon-Prev"></i></div>
      <label class = "flex-con" for = "sear">
        <form action = "" @submit.prevent="search(keyword)">
          <input type = "search" id = "sear"  placeholder = "输入搜索关键字" v-model = "keyword">
        </form>
      </label>
      <div class = "cancel" @click = "cancel" v-if="showCancle">取消</div>
    </div>
    <div class = "hot">
      <p class = "til">热门搜索</p>
      <ul class = "hist-list">
        <li class = "item" v-for="hot in hotList" @click="search(hot.k)">{{hot.k}}</li>
      </ul>
    </div>
    <div class = "hist">
      <div class = "til flex-warp flex-middle flex-between"><p>搜搜历史</p>
        <p class = "clear">清除历史</p></div>
      <ul class = "hist-list">
        <li class = "item flex-warp flex-middle flex-between">
          <div>差不多先生 本兮</div>
          <div class = "clear"><i class = "iconfont icon-close"></i></div>
        </li>
      </ul>
    </div>
    <div class = "search-res" v-if = "showRes">
      <ul class = "res-list">
        <router-link tag="li" :to="'/search/'+zhida.singermid" :key="zhida.singermid" class="singer flex-warp flex-middle" v-if="zhida.type===2">
          <div class="avat"><img v-lazy="picUrl(zhida)" alt=""></div>
          <div class="name">
            <p class="sname">{{zhida.singername}}</p>
            <p class="count">
              <span class="abnum">专辑 {{zhida.albumnum}}</span>
              <span class="snum">单曲 {{zhida.songnum}}</span>
            </p>
          </div>
        </router-link>
        <li class = "item flex-warp flex-middle" v-for="(res,index) in resList" @click="selectSong(res,index)">
          <div class="avat"><i class="iconfont icon-ej"></i></div>
          <div class="flex-con">
            <p class="songname" v-html="res.songname"></p>
            <p class="singername" v-html="singer(res.singer)"></p>
          </div>
          <div class="add" @click.stop="addCollect(res)"><i class="iconfont icon-add"></i></div>
        </li>
      </ul>
    </div>
    <transition name="slideInRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import jsonp from 'common/js/jsonp';
import {gdMusicData} from'common/js/base';
import {recommend,options} from '@/apiConfig';
import {mapActions,mapState,mapMutations} from 'vuex'
  export default{
    data(){
      return {
        keyword: '',
        hotList:[],
        resList: [],
        zhida:{},
      }
    },
    computed: {
      ...mapState(['curSongIndex']),
      showRes(){
        return this.resList.length > 0;
      },
      showCancle(){
        return this.resList.length > 0;
      }
    },
    mounted(){
        this.init();
    },
    methods : {
      ...mapActions(['dispatchcgflae']),
      ...mapMutations(['AddToSongList']),
      init(){
        this.getHotList();
      },
      addCollect(song){
        var songMsg=gdMusicData(song);
        this.AddToSongList(songMsg);
      },
      selectSong(song,index){
        var songMsg=gdMusicData(song);
        var songList=[];
        this.resList.forEach((el)=>{
          songList.push(gdMusicData(el));
        })
        this.dispatchcgflae({
          songMsg,
          songList,
          index
        })
      },
      cancel(){
          this.keyword='';
          this.resList=[];
      },
      getHotList(){
        var url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
        var datas= Object.assign({},recommend,{
          uin:0,
          platform:'h5',
          needNewCode:1,
          _:1501636107028,
        })
        jsonp(url,datas,options).then((res)=>{
            this.hotList=res.data.hotkey.splice(0,15);
        })
      },
      singer(singers){
          var arr =[];
          singers.forEach((el)=>{
              arr.push(el.name)
          })
        return arr.join('、');
      },
      //拼接图片地址
      picUrl(singer){
        return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.singermid}.jpg?max_age=2592000`;
      },
      search(keyword){
        this.keyword=keyword;
        var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
        var datas=Object.assign({},recommend,{
          uin:0,
          notice:0,
          platform:'h5',
          needNewCode:1,
          w:keyword,
          zhidaqu:1,
          catZhida:1,
          t:0,
          flag:1,
          ie:'utf-8',
          sem:1,
          aggr:0,
          perpage:20,
          n:100,
          p:1,
          remoteplace:'txt.mqq.all',
          _:1501642153245
        })
        jsonp(url,datas,options).then((res)=>{
          this.resList=res.data.song.list;
          this.zhida=res.data.zhida;
        })
      }
    },
    watch:{
      keyword(nval){
          this.search(nval);
      }
    }
  }
</script>

<style scoped lang = 'scss' rel = 'stylesheet/scss'>
  @import "~common/css/base";
  @import "~common/css/mixin";

  .search-component {
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    margin-top: 0 !important;
    background-color: #fff;
    .search-header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      padding: 0 1rem;
      height: 4.4rem;
      background-color: #fff;
      z-index: 999;
      box-shadow: 0 1px 1rem rgba(0, 0, 0, .1);
      label {
        margin-right: 1rem;
      }
      input {
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 1.2rem;
        border-radius: 1.5rem;
        border: 1px solid #e0e0e0;
        width: 100%;
        font-size: 1.2rem;
      }
      .cancel {
        color: $primary-text-color;
        font-size: 1.3rem;
        @include extend-click();
      }
      .back{
        margin-right: 1rem;
        @include extend-click();
      }
    }
    .hot {
      padding: 5.4rem 1rem 1rem;
      .til {
        font-size: $font-size-medium-x;
        color: $color-text-l;
        margin-bottom: 1rem;
      }
      .item {
        display: inline-block;
        font-size: $font-size-medium;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        border: 1px solid #e0e0e0;
        margin: 0 0.5rem 1rem 0;
      }
    }
    .hist {
      .til {
        padding: 0 1rem 0.8rem;
        font-size: $font-size-medium-x;
        color: $color-text-l;
        .clear {
          color: $primary-text-color;
        }
      }
      .hist-list {
        .item {
          margin-left: 1rem;
          padding-right: 1rem;
          @include border-1px-b();
          height: 3.6rem;
          font-size: 1.2rem;
          .iconfont {
            margin-left: 2rem;
            @include extend-click();
            color: $color-text-i;
            &.icon-add {
              color: $primary-text-color;
            }
          }
        }
      }
    }
    .search-res {
      position: fixed;
      left: 0;
      right: 0;
      top: 5.4rem;
      bottom: 6rem;
      background-color: #fff;
      z-index: 9999;
      overflow-y: scroll;
      .res-list {
        .item {
          @include border-1px-b();
          margin-left: 1rem;
          padding-right: 1rem;
          line-height: 2rem;
          padding-top:0.6rem;
          padding-bottom:0.6rem;
          .songname{
            font-size: 1.4rem;
          }
          .singername{
            color: $color-text-i;
            font-size: 1rem;
          }
          .avat{
            margin-right: 1rem;
            .iconfont{
              font-size: 3rem;
              color: $color-text-d;
              font-weight: 100;
            }
          }
          .add{
            .icon-add{
              color: $color-text-d;
              @include extend-click();
            }
          }
        }
      }
      .singer {
        @include border-1px-b();
        .avat {
          width: 6rem;
          height: 6rem;
          padding: 1rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .name {
          font-size: $font-size-big-x;
          color: $color-text-v;
          font-size: 1.5rem;
          .count{
            .abnum{
              margin-right: 1rem;
            }
            color: $color-text-l;
            font-size: 1.2rem;
            margin-top: 0.6rem;
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
  .slideInRight-enter, .slideInRight-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
  }
</style>
