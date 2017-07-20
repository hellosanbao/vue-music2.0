<template>
  <div id="app">
    <m-header></m-header>
    <home-nav></home-nav>
    <keep-alive>
      <router-view></router-view>
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

</style>
