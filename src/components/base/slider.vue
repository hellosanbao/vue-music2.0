<template>
  <div class="swiper-container" :class="wrap">
      <slot></slot>
  </div>
</template>

<script>
    import Swiper from 'swiper';
    export default{
        data(){
            return {}
        },
        props:{
          slideParams:{
            type:Object,
            default:()=>{
                return {
                  loop: true,
                  pagination: '.swiper-pagination',
                  autoplay:3000
                }
            }
          },
          wrap:String,
          default:'swiper-container'
        },
        methods: {
            init(s){
                console.log(s)
              var mySwiper = new Swiper ('.swiper-container', this.slideParams)
            }
        },
    }
</script>

<style scoped>
    body {
        background-color: #ff0000;
    }
</style>
