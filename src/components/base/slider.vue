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
        mounted(){
            var _this=this;
            setTimeout(()=>{
              _this.init();
            },20)
        },
        methods: {
            init(){
              var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                autoplay:3000
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
