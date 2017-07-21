<template>
  <div class = "swiper-container" id="scroll-components">
    <div id="scroll-list">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import bscroll from 'better-scroll';
  export default{
    data(){
      return {}
    },
    methods: {
      init(){
        this.scroll()
      },
      scroll(){
        let scroll = new bscroll(document.getElementById('scroll-list'), {
          startX: 0,
          startY: 0,
        })
      }
    }
  }
</script>

<style scoped lang = "scss" rel = "stylesheet/scss">
  #scroll-components {
    position: fixed;
    left: 0;
    top:9.5rem;
    bottom: 0;
    width: 100%;
    #scroll-list{
      height: 100%;
    }
  }
</style>
