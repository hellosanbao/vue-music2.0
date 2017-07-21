<template>
  <div class="hots">
    <scroll ref="topSongList">
      <ul class="list-group">
        <li class="item flex-warp flex-middle" v-for="top in topList">
          <div class="avat">
            <img v-lazy = "top.picUrl" alt = "">
          </div>
          <div class="nr flex-con">{{top.topTitle}}</div>
          <ul class="song-list">
            <li class="song-item" v-for="song in top.songList">
              <span>{{song.songname}}</span>
              <span>{{song.singername}}</span>
            </li>
          </ul>
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
  .list-group{
    padding: 1rem 1rem 0 1rem;
    .item {
      margin-bottom: 1rem;
      .avat{
        width: 10rem;
        height: 10rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

  }

</style>
