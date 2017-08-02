<template>
  <div class = "search-component">
    <div class = "search-header flex-warp flex-middle">
      <label class = "flex-con" for = "sear">
        <input type = "search" id = "sear" placeholder = "输入搜索关键字" v-model = "keyword">
      </label>
      <div class = "cancel" onclick = "history.go(-1)">取消</div>
    </div>
    <div class = "hot">
      <p class = "til">热门搜索</p>
      <ul class = "hist-list">
        <li class = "item">明日之子</li>
        <li class = "item">什么都不会开始就</li>
        <li class = "item">塑胶地板</li>
        <li class = "item">是的</li>
        <li class = "item">是多少</li>
        <li class = "item">是多少</li>
        <li class = "item">二</li>
        <li class = "item">二恶</li>
        <li class = "item">天涯海阁</li>
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
        <li class = "item">差不多先生</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {jsonp} from 'common/js/jsonp';
import {recommend,options} from '@/apiConfig';
  export default{
    data(){
      return {
        keyword: '',
        resList: []
      }
    },
    computed: {
      showRes(){
        return this.resList > 0;
      }
    },
    mounted(){
      this.init();
    },
    methods : {
      init(){
        this.getHotList();
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
            console.log(res)
        })
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
      bottom: 0;
      background-color: #fff;
      z-index: 9999;
      overflow-y: scroll;
      .res-list {
        .item {
          @include border-1px-b();
          margin-left: 1rem;
          padding-right: 1rem;
          height: 3.6rem;
          line-height: 3.6rem;
          font-size: 1.2rem;
        }
      }
    }
  }
</style>
