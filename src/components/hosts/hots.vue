<template>
  <div class="hots">
    <scroll ref="topSongList">
      <ul class="list-group">
        <li class="item flex-warp flex-middle" v-for="top in topList">
          <div class="avat">
            <img v-lazy = "top.picUrl" alt = "">
          </div>
          <div class="nr flex-con">
            <p class="title">{{top.topTitle}}</p>
            <ul class="song-list">
              <li class="song-item ellipsis" v-for="song in top.songList">
                <span class="sname">{{song.songname}}</span>
                <span class="author">{{song.singername}}</span>
              </li>
            </ul>
          </div>

        </li>
      </ul>
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
                topList:[]
            }
        },
        mounted(){
           this.init();
        },
        methods: {
            init(){
                this.getTopList()
            },
          getTopList(){
                var _this=this;
                var url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
                var data=Object.assign({},recommend,{
                  g_tk:5381,
                  uin:0,
                  format:'jsonp',
                  platform:'h5',
                  needNewCode:1,
                  _:1500627470237,
                })
            jsonp(url,data,options).then((res)=>{
              _this.topList=res.data.topList;
              setTimeout(()=>{
                _this.$refs.topSongList.init();
              },100)
            })
          }
        },
      components:{
        scroll
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import "~common/css/base";
  .list-group{
    background-color: $light-bg-color;
    padding: 1rem;
    .item {
      background-color: $def-bg-color;
      margin-bottom: 1rem;
      border-radius: 0.3rem;
      overflow: hidden;
      .avat{
        width: 10rem;
        height: 10rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .nr{
        padding: 0 1rem;
        .title{
          font-weight: 500;
          font-size: $font-size-large;
          color: $color-text-v;
          padding-bottom: 0.5rem;
        }
        .song-list{
          .song-item{
            line-height: 2rem;
            font-size: $font-size-big;
            .author{
              font-size: $font-size-medium-x;
              color: $color-text-d;
            }
          }
        }
      }
    }

  }

</style>
