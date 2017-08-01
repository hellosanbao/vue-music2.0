<template>
  <div id="app">
    <div id="header">
      <m-header></m-header>
      <home-nav></home-nav>
    </div>
    <player></player>
    <keep-alive>
      <router-view id="main-content"></router-view>
    </keep-alive>
    <transition name="slideInRight">
      <router-view name="win"></router-view>
    </transition>

  </div>
</template>

<script>
  import mHeader from 'components/header';
  import homeNav from 'components/homeNav';
  import player from 'components/player/player.vue';

export default {
  name: 'app',
  components:{
    mHeader,
    homeNav,
    player
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #header{
      position: fixed;
      left: 0;
      top:0;
      width: 100%;
      z-index: 100;
    }
  #main-content{
    margin-top: 9.5rem;
  }
    .slideInRight-enter-active {
      transition: all .3s ease;
    }
    .slideInRight-leave-active {
      transition: all .3s ease;
    }
    .slideInRight-enter, .slideInRight-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(100%);
    }
</style>
