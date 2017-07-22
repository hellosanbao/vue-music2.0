<template>
  <div class="singer-warp">
    <div class="singer-content">
      <scroll ref="scrollWrap" @scroll="centerScroll" :lisenScroll='lisenScroll'>
        <div class="singer-list">
          <div class="list-group" v-for="(res,index) in formatSingerList" ref="listGroup">
            <div class="list-group-title" ref="listTil">{{res.til}}</div>
            <ul class="list-group-item">
              <router-link tag="li" :to="'singer/'+singer.Fsinger_mid" :key="singer.Fsinger_mid" class="item flex-warp flex-middle" v-for="singer in res.list">
                <div class="avat"><img v-lazy="picUrl(singer)" alt=""></div>
                <div class="name">{{singer.Fsinger_name}}</div>
              </router-link>
            </ul>
          </div>
        </div>
      </scroll>
      <div class="curTil" ref="curTil">{{formatSingerList[mapObj.curIndex].til}}</div>
      <div class="singer-map" @touchmove.stop.prevent="mapTouchmove">
        <p v-for="(k,index) in formatSingerList"
           ref="magItem"
           @touchstart.stop.prevent="mapTouchstart"
           :class="{active:index===mapObj.curIndex}"
        >{{k.til}}</p>
      </div>
    </div>
    <transition name="slideInRight">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  import jsonp from 'common/js/jsonp';
  import {recommend, options} from '@/apiConfig';
  import scroll from 'components/base/scroll';
  import $ from 'jquery'
  export default{
    data(){
      return {
        singerList: [],
        mapObj    : {
          firstIndex: 0, //第一次触碰右侧map字母索引
          curIndex  : 0,  //当前字母索引
          firstY    : 0, //第一次触碰右侧map时的y坐标
        },
        scrollY:0, //滚动条到顶部的距离
        lisenScroll:true, //是否监听滚动事件
        heightlist:[],//每一段高度的数组
        topTilFixed:0,//固定til的纵向偏移
      }
    },
    mounted(){
      this.init();
    },
    computed  : {
      formatSingerList(){
        const hotLength = 10;
        let resList = {
          hot: {
            til : '热',
            list: []
          }

        };

        this.singerList.forEach((el, ind) => {
          if (ind < hotLength) {
            resList.hot.list.push(el)
          }
          const key = el.Findex;
          if (!resList[key]) {
            resList[key] = {
              til : key,
              list: []
            }
          }
          resList[key].list.push(el);
        })

        let normal = [];
        let hot = [];
        for (let key in resList) {
          let val = resList[key];
          if (val.til.match(/[a-zA-z]/)) {
            normal.push(val);
          } else if (val.til === '热') {
            hot.push(val);
          }
        }
        normal.sort((a, b) => {
          return a.til.charCodeAt() - b.til.charCodeAt();
        })
        resList = hot.concat(normal)
        return resList;
      }
    },
    methods   : {
      init(){
        this.getSingerList();
      },
      //拼接图片地址
      picUrl(singer){
        return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.Fsinger_mid}.jpg?max_age=2592000`;
      },
      //获取歌曲数据
      getSingerList(){
        var _this = this;
        var rnd = Math.random().toString().substr(2, 15);
        var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?';
        var data = Object.assign({}, recommend, {
          format     : 'jsonp',
          loginUin   : 0,
          hostUin    : 0,
          channel    : 'singer',
          page       : 'list',
          key        : 'all_all_all',
          pagesize   : 100,
          pagenum    : 1,
          platform   : 'yqq',
          needNewCode: 0,
        })
        jsonp(url, data, options).then((res) => {
          _this.singerList = res.data.list;
          _this.$nextTick(() => {
            _this.$refs.scrollWrap.init();
            _this.calcHeight();
//            console.log(this.formatSingerList)
          })
        })
      },
      //右侧字母导航touchestart事件
      mapTouchstart(e){
        let thouch = e.touches[0];
        this.mapObj.firstY = thouch.pageY;
        this.mapObj.firstIndex = $(e.target).index();
        this.mapObj.curIndex = this.mapObj.firstIndex;
        this.$refs.scrollWrap.scrollToElement(this.$refs.listTil[this.mapObj.firstIndex], 0);

      },
      //在右侧导航上滑动时
      mapTouchmove(e){
        let thouch = e.touches[0];
        let curY = thouch.pageY;
        let index = (thouch.pageY - this.mapObj.firstY) / this.$refs.magItem[0].clientHeight | 0;
        index = index + this.mapObj.firstIndex;
        this.mapObj.curIndex = index;
        if (index < 0) {
          this.mapObj.curIndex = 0;
        } else if (index > this.formatSingerList.length - 1) {
          this.mapObj.curIndex = this.formatSingerList.length - 1;
        }
        this.$refs.scrollWrap.scrollToElement(this.$refs.listTil[this.mapObj.curIndex], 0);
      },
      //计算每一段list的高度
      calcHeight(){
          var heightList=[];
          var height=0;
          heightList.push(height)
          this.$refs.listGroup.forEach((el,ind)=>{
            height+=el.clientHeight;
            heightList.push(height);
          })
        this.heightlist = heightList;
      },
      //中间区域滚动时
      centerScroll(pos){
        this.scrollY=pos.y;
      }
    },
    watch:{
      scrollY(newY){
        const heightlist=this.heightlist;
        var topTilFixed=0;//til纵向偏移
        heightlist.forEach((el,i)=>{
          var h1=heightlist[i],h2=heightlist[i+1];
          if(-newY>=h1 && -newY<h2){
            this.mapObj.curIndex = i;
          }

          //下一个til把当前til顶上去
          if(-newY<h2 && h2+newY<=this.$refs.curTil.clientHeight){
            topTilFixed = -this.$refs.curTil.clientHeight-(-newY-h2);
          }
          if(-newY==heightlist[this.mapObj.curIndex+1]){
            topTilFixed=0;
          }
        })
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.mapObj.curIndex = 0
          topTilFixed=newY;
        }

        this.$refs.curTil.style.transform = `translate3d(0,${topTilFixed}px,0)`
      }
    },
    components: {
      scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";

  .singer-content {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    .curTil{
      position: fixed;
      left: 0;
      top:9.5rem;
      width: 100%;
      color: $primary-text-color;
      background-color: #f0f0f0;
      line-height: 2rem;
      text-indent: 1rem;
      z-index: 9998;
    }
    .singer-box {
      height: 100%;
      position: relative;
    }
    .list-group {
      .list-group-title {
        color: $primary-text-color;
        background-color: #f0f0f0;
        line-height: 2rem;
        text-indent: 1rem;
      }
      .item {
        .avat {
          width: 6rem;
          height: 6rem;
          padding: 1rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .name {
          font-size: $font-size-big-x;
          color: $color-text-v;
        }
      }
    }
  }

  .singer-map {
    position: fixed;
    right: 1rem;
    top: 55%;
    transform: translateY(-50%);
    z-index: 9999;
    p.active {
      color: $primary-text-color;
      line-height: 1.5rem;
      height: 1.5rem;
    }
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
