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
                let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
                let data=Object.assign({},recommend,{
                  type:1,
                  onlysong:0,
                  disstid:this.$route.params.id,//2673619726,
                  loginUin:0,
                  hostUin:0,
                  notice:0,
                  platform:'yqq',
                  needNewCode:0,
                })
              jsonp(url, data, {param:'callback',prefix:'callback'}).then((res) => {
                this.pic=`background:url(${res.cdlist[0].logo}) no-repeat center top/100% auto #fff`
                  this.recommendList=this.recommendList.concat(res.cdlist[0].songlist);
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
