<template>
  <div class="recommendMv">
    <div class="ret-title">热门推荐</div>
    <slider ref="slide" :slideParams="slideParams">
      <div class = "swiper-wrapper">
        <div class = "swiper-slide" style="height: 10rem;background-color: #f60">
          slide1
        </div>
        <div class = "swiper-slide" style="height: 10rem;background-color: #f60">
          slide2
        </div>
        <div class = "swiper-slide" style="height: 10rem;background-color: #f60">
          slide3
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
    import slider from 'components/base/slider';
    export default{
        data(){
            return {
              slideParams:{
                slidesPerView : 2,//'auto'
                loop: false,
              }
            }
        },
        mounted(){
            var _this=this;
          setTimeout(function(){
              _this.$refs.slide.init(111)
          },20)
        },
        methods: {
            init(){

            }
        },
      components:{
        slider
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
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
</style>
