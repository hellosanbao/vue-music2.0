<template>
  <div class = "slide">
    <slider :autoPlay="2000" ref="slide">
      <div class = "swiper-wrapper">
        <div class = "swiper-slide" v-for="banner in bannerList">
          <img :src = "banner.picUrl" alt = "">
        </div>
      </div>
      <div class = "swiper-pagination"></div>
    </slider>
  </div>
</template>

<script>
  import slider from 'components/base/slider';
  import jsonp from 'common/js/jsonp';
  import {recommend, options} from '@/apiConfig'
  export default{
    data(){
      return {
          bannerList:[]
      }
    },
    mounted(){
        this.init();
    },
    methods   : {
      init(){
        this.getBanner()
      },
      //获取banner
      getBanner: function () {
        var _this=this;
        var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?';
        const data = Object.assign({}, recommend, {
          platform   : 'h5',
          uin        : 0,
          needNewCode: 1
        })
        jsonp(url, data, options).then((ret)=>{
            if(ret.code==0){
              _this.bannerList=ret.data.slider;
              setTimeout(()=>{
                _this.$refs.slide.init();
              },20)
            }

        });
      }
    },
    components: {
      slider
    }
  }
</script>

<style scoped lang = "scss" rel = "stylesheet/scss">
  @import "../../node_modules/swiper/dist/css/swiper.min.css";
  .swiper-slide img{
    width: 100%;
  }
</style>
