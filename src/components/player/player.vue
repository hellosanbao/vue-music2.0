<template>
    <div class="player-content">
      <div class="full-play" v-if="fullPlay">全屏播放器</div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default{
        computed:{
          ...mapState(['fullPlay'])
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.full-play{
  position: fixed;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: #fff;
}
</style>
