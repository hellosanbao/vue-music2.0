<template>
  <div id="app">
    <div id="header">
      <m-header></m-header>
      <home-nav></home-nav>
    </div>
    <keep-alive>
      <router-view id="main-content"></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import mHeader from 'components/header';
  import homeNav from 'components/homeNav';
export default {
  name: 'app',
  components:{
    mHeader,
    homeNav
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #header{
      position: fixed;
      left: 0;
      top:0;
      width:  100%;
      z-index: 100;
    }
  #main-content{
    margin-top: 9.5rem;
  }
</style>
