import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend.vue'
import singer from 'components/singer/singer.vue'
import hots from 'components/hosts/hots.vue'
import singerSongList from 'components/singerSongList.vue'
import recommendDetail from 'components/recommend/recommendDetail.vue'
import hotDetail from 'components/hosts/hotDetail.vue'
import search from 'components/search.vue'
import member from 'components/member.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: 'gd/:id',
          component: recommendDetail
        },
        {
          path: 'hot/:pid',
          component: hotDetail
        }
      ]
    },
    {
      path:'/singer',
      component:singer,
      children: [
        {
          path: ':id',
          component: singerSongList
        }
      ]
    },
    {
      path:'/hots',
      component:hots,
      children: [
        {
          path: ':pid',
          component: hotDetail
        }
      ]
    },
    {
      path:'/search',
      components:{
        win:search
      }
    },
    {
      path:'/member',
      components:{
        win:member
      }
    },
    {
      path:'/',
      redirect:'/recommend'
    }
  ]
})
