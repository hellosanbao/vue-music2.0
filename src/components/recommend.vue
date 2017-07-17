<template>
  <div class="slide">
    <slider>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <div class="swiper-pagination"></div>
    </slider>
  </div>
</template>

<script>
    import slider from 'components/base/slider'
    export default{
        data(){
            return {}
        },
        components:{
          slider
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../node_modules/swiper/dist/css/swiper.min.css";

</style>
