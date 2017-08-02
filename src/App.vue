<template>
  <div id="app">
    <div id="header">
      <m-header></m-header>
      <home-nav></home-nav>
    </div>
    <keep-alive>
      <router-view id="main-content"></router-view>
    </keep-alive>
    <transition name="slideInRight">
      <router-view name="win"></router-view>
    </transition>
    <collect v-if="isShowMySongList"></collect>

    <player></player>
  </div>
</template>

<script>
  import mHeader from 'components/header';
  import homeNav from 'components/homeNav';
  import player from 'components/player/player';
  import collect from 'components/base/collect';
  import {mapState} from 'vuex'

  export default {
    name      : 'app',
    computed  : {
      ...mapState(['isShowMySongList'])
    },
    components: {
      mHeader,
      homeNav,
      player,
      collect
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  #header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  #main-content {
    margin-top: 9.5rem;
  }

  .slideInRight-enter-active, .slideInRight-leave-active {
    transition: all .3s ease;
  }

  .slideInRight-enter, .slideInRight-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(100%);
  }
</style>
