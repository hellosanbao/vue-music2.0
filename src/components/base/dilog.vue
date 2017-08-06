<template>
    <div class="dilog-content">
      <div class="bg-cover" v-if="type=='alert'"></div>
      <!-- toast -->
      <div class="dilog-warp flex-warp flex-center flex-middle">
        <div class="toast" v-if="type=='toast'">{{msg}}</div>
        <!-- alert -->
        <div class="alert" v-if="type=='alert'">
          <div class="content flex-warp flex-middle flex-center">{{msg}}</div>
          <div class="btn flex-warp">
            <div class="left flex-con" @click="ok">确定</div>
            <div class="right flex-con" @click="hideDilog">取消</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
    export default{
        props:{
            type:{
              type:String,
              default:'toast'
            },
            msg:{
                type:String,
                default:'操作成功'
            }
        },
      methods:{
        ...mapMutations(['hideDilog']),
        ok(){
            this.hideDilog();
        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  .bg-cover,.dilog-warp{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index: 9999999;
  }
  .bg-cover{
    background-color: rgba(0,0,0,0.5);
    z-index: 9999998;
  }
  .toast{
    background-color: rgba(0,0,0,.9);
    height: 3rem;
    line-height: 3rem;
    padding: 0 2rem;
    max-width: 30rem;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1.2rem;
  }
  .alert{
    width: 28rem;
    min-height: 12rem;
    background-color: #fff;
    border-radius: 2rem;
    .content{
      min-height: 8rem;
      box-sizing: border-box;
      padding: 1rem;
      border-bottom: 1px solid #e7e7e7;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .btn{
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-size: 1.2rem;
      .left{
        border-right: 1px solid #e7e7e7;
      }
    }
  }
</style>
