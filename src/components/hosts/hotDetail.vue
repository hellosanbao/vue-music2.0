<template>
  <list-view :datalist="recommendList" :pic="pic"></list-view>
</template>

<script>
  import jsonp from 'common/js/jsonp';
  import {recommend, options} from '@/apiConfig';
  import listView from 'components/base/listView'
  export default{
    data(){
      return {
        recommendList:[],
        pic:''
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.getRecommendList();
      },
      getRecommendList(){
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?';
        let data=Object.assign({},recommend,{
          g_tk:1928093487,
          type:1,
          onlysong:0,
          loginUin:0,
          hostUin:0,
          notice:0,
          platform:'h5',
          needNewCode:1,
          uin:0,
          tpl:3,
          page:'detail',
          type:'top',
          topid:this.$route.params.pid,
          _:1500946493824,
        })
        jsonp(url, data, {param:'jsonpCallback',prefix:'callback'}).then((res) => {
          this.pic=`background:url(${res.topinfo.pic}) no-repeat center top/100% auto #fff`
          var arr=[];
          res.songlist.forEach((el)=>{
            arr.push({
              songname:el.data.songname,
              author:el.data.songorig,
            })
          })
          this.recommendList=this.recommendList.concat(arr);
        })

      }
    },
    components:{
      listView
    }
  }
</script>

<style scoped lang = 'scss' rel = 'stylesheet/scss'>

</style>
