<template>
  <div class="scroll-components" ref="scrollWap" :style="{top:top}">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import bscroll from 'better-scroll';
  export default{
    props  : {
      lisenScroll: {
        type   : Boolean,
        default: false
      },
      top        : {
        type   : String,
        default: '9rem'
      }
    },
    data(){
      return {
        scrollobj: {}
      }
    },
    methods: {
      init(){
        this.initscroll()
      },
      initscroll(){
        this.scrolloj = new bscroll(this.$refs.scrollWap, {
          startX   : 0,
          startY   : 0,
          probeType: 3,
          click    : true
        })
        if (this.lisenScroll) {
          this.scrolloj.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
      },
      scrollToElement(){
        this.scrolloj.scrollToElement.apply(this.scrolloj, arguments);
      },
      scrollTo() {
        this.scrolloj && this.scrolloj.scrollTo.apply(this.scrolloj, arguments)
      },
      refresh() {
        this.scrolloj && this.scrolloj.refresh()
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .scroll-components {
    position: fixed;
    left: 0;
    top: 9.5rem;
    bottom: 0;
    width: 100%;
  }
</style>
