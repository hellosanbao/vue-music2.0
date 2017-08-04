<template>
  <div class="recommend" v-show="isLoadingEnd">
    <scroll ref="scrollContent">
      <slider ref="slide" wrap="topBanner" class="slider-wrap">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in bannerList">
            <img :src="banner.pic" alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </slider>
      <hot-recommend></hot-recommend>
      <hot-recommend-mv ref='mvScroll' :datas="mvRecList"></hot-recommend-mv>
      <recommend-list :recommendList="recommendList"></recommend-list>
    </scroll>
    <transition name="slideInRight">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import slider from 'components/base/slider';
  import jsonp from 'common/js/jsonp';
  import {recommend, options} from '@/apiConfig';
  import scroll from 'components/base/scroll';
  import hotRecommend from 'components/recommend/hotRecommend';
  import hotRecommendMv from 'components/recommend/hotRecommendMv';
  import recommendList from 'components/recommend/recommendList';
  import {mapMutations} from 'vuex';
  export default{
    data(){
      return {
        bannerList: [],
        mvRecList: [],
        hmList:[],
        recommendList:[],
        isLoadingEnd:false
      }
    },
//    updated(){
//      this.$refs.scrollContent.refresh();
//    },
    mounted(){
      this.init();
    },
    methods   : {
      ...mapMutations(['HideLoading']),
      init(){
        this.getHotRecommend()
      },
      //获取数据
      getHotRecommend(){
        var _this=this;
        var rnd=Math.random().toString().substr(2,15);
        var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg';
        var data = Object.assign({},recommend,{
          format:'jsonp',
          tpl:'v12',
          page:'other',
          rnd:rnd,
          loginUin:0,
          hostUin:0,
        })
        jsonp(url,data,options).then((res)=>{
          _this.hmList=res.data.hotdiss.list.slice(0,6);
          _this.bannerList=res.data.focus;
          _this.mvRecList=res.data.shoubomv.all;
          _this.recommendList=res.data.toplist;
          _this.isLoadingEnd=true;
          _this.$nextTick(function(){
            setTimeout(() => {
              _this.$refs.slide.init();
              _this.$refs.mvScroll.init();
              _this.$refs.scrollContent.init();
              _this.HideLoading();
            }, 200)
          })

        })

      }
    },
    components: {
      slider,
      hotRecommend,
      hotRecommendMv,
      recommendList,
      scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../node_modules/swiper/dist/css/swiper.min.css";
  .swiper-slide{
    height: 15rem;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    display: block;
  }
  .slider-wrap{
    margin-bottom: 1rem;
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
