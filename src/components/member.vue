<template>
  <div class="member-component">
    只是用户页
  </div>
</template>

<script>

    export default{
        data(){
            return {}
        },
        methods: {
            init(){
                //..do sth
            }
        }
    }
</script>

<style scoped lang = 'scss' rel = 'stylesheet/scss'>
  .member-component{
    position: fixed;
    left: 0;
    top:0;
    right:0;
    bottom:0;
    z-index: 9999;
    margin-top: 0!important;
    background-color: #fff;
  }
</style>
