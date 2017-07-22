import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend.vue'
import singer from 'components/singer/singer.vue'
import hots from 'components/hosts/hots.vue'
import singerSongList from 'components/singerSongList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: recommend
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
      component:hots
    },
    {
      path:'/',
      redirect:'/recommend'
    }
  ]
})
