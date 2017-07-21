<template>
  <div class="singer-content">
    <scroll ref="scrollWrap">
      <div class="singer-list">
        <ul class="list-group">
          <li class="item flex-warp flex-middle" v-for="singer in singerList">
            <div class="avat"><img v-lazy = "picUrl(singer)" alt = ""></div>
            <div class="name">{{singer.Fsinger_name}}</div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
  import jsonp from 'common/js/jsonp';
  import {recommend, options} from '@/apiConfig';
  import scroll from 'components/base/scroll';
    export default{
        data(){
            return {
                singerList:[]
            }
        },
        mounted(){
          this.init();
        },
        methods: {
            init(){
                this.getSingerList();
            },
            picUrl(singer){
                return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.Fsinger_mid}.jpg?max_age=2592000`;
            },
            getSingerList(){
              var _this=this;
              var rnd=Math.random().toString().substr(2,15);
              var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?';
              var data = Object.assign({},recommend,{
                format:'jsonp',
                loginUin:0,
                hostUin:0,
                channel:'singer',
                page:'list',
                key:'all_all_all',
                pagesize:100,
                pagenum:1,
                platform:'yqq',
                needNewCode:0,
              })
              jsonp(url,data,options).then((res)=>{
                _this.singerList=res.data.list;
                _this.$nextTick(()=>{
                  _this.$refs.scrollWrap.init();
                })
              })

            }
        },
      components:{
        scroll
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  .singer-content{
    position: fixed;
    left: 0;
    top:0;
    bottom:0;
    width: 100%;
    .list-group{
      .item{
        .avat{
          width: 6rem;
          height: 6rem;
          padding: 1rem;
          img{
            width: 100%;
            height:100%;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .name{
          font-size: $font-size-big-x;
          color: $color-text-v;
        }
      }
    }
  }

</style>
