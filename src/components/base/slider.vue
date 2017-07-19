<template>
  <div class="swiper-container">
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
          autoPlay:{
            type:Number,
            default:3000
          }
        },
        methods: {
            init(){
              var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                autoplay:this.autoPlay
              })
            }
        },
    }
</script>

<style scoped>
    body {
        background-color: #ff0000;
    }
</style>
