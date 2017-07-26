<template>
  <div class = "hotrecommend">
    <div class="ret-title">热门歌单</div>
    <ul class = "hm-list">
      <router-link tag="li" :to="'/recommend/gd/'+hm.dissid" :key="hm.dissid" class = "item" v-for="hm in hmList">
        <div class = "cover">
          <img v-lazy = "hm.imgurl" alt = "">
          <div class = "nr flex-warp flex-between">
            <div><i class = "iconfont icon-ej"></i>{{hm.listennum | formatNum}}</div>
            <div><i class = "iconfont icon-play-song"></i></div>
          </div>
        </div>
        <p class = "desc">{{hm.dissname}}</p>
      </router-link>
    </ul>

  </div>
</template>

<script>
  import {options,recommend} from '@/apiConfig';
  import jsonp from 'common/js/jsonp';
  import axios from 'axios';
  import $ from 'jquery';
  export default{
    data(){
      return {
          hmList:[]
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.getHotRecommend();
      },
      bgImg(img){
        return `background:url(${img}) no-repeat center/cover`;
      },
      getHotRecommend(){
        var _this=this;
        var rnd=Math.random().toString().substr(2,15);
        var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg';
        var data = Object.assign({},recommend,{
          format:'jsonp',
          tpl:'v12',
          page:'other',
          rnd:rnd,
          jsonpCallback:'GetRecomListCallback'+rnd,
          loginUin:0,
          hostUin:0,
        })

        $.ajax({
          url:url,
          data:data,
          dataType:'jsonp',
          jsonp:'jsonpCallback',
          success:function(res){
            _this.hmList=res.data.hotdiss.list.slice(0,6);
          }
        })

      }
    }
  }
</script>

<style scoped lang = "scss" rel = "stylesheet/scss">
  @import "~common/css/base";

  .ret-title{
    font-size: $font-size-large;
    color: $color-text-ll;
    text-align: center;
    line-height: 3.5rem;
    position: relative;
    color: $primary-text-color;
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
    }
  }
  .hm-list {
    width: 100%;
    @extend .flex-break;
    .item {
      margin-bottom: 1rem;
      width: 32.8%;
      .cover {
        padding-top: 100%;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top:0;
          z-index: 10;
        }
        .nr {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 11;
          width: 100%;
          box-sizing: border-box;
          height: 2.5rem;
          line-height: 2.5rem;
          color: $color-text;
          padding: 0 0.5rem;
          .icon-ej {
            font-size: $font-size-medium-x;
            margin-right: 0.2rem;
          }
          .icon-play-song {
            font-size: $font-size-large-x;
          }
        }
      }
      .desc {
        @extend .ellipsis-2;
        color: $color-text-l;
        font-size: $font-size-medium-x;
        padding: 0.5rem;
        line-height: 1.5rem;
      }
    }

  }
</style>
