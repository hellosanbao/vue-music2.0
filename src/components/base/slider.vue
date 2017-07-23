<template>
  <div class="swiper-container" :class="wrap">
    <slot></slot>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  export default{
    data(){
      return {
          swiper:null
      }
    },
    props  : {
      slideParams: {
        type   : Object,
        default: () => {
          return {
            loop      : true,
            pagination: '.swiper-pagination',
            autoplay  : 3000
          }
        }
      },
      wrap       : {
        type   : String,
        default: 'swiper-container'
      }
    },
    methods: {
      init(){
          var _this=this;
        this.swiper = new Swiper(`.${this.wrap}`, Object.assign({},this.slideParams,{
          onSlideChangeStart: function (swiper) {
              _this.$emit('SlideChangeStart',swiper);
          }
        }))
      },
      slideTo(){
        this.swiper.slideTo.apply(this.swiper,arguments);
      }
    },
  }
</script>

<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
