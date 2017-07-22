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
        this.swiper = new Swiper(`.${this.wrap}`, this.slideParams)
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
