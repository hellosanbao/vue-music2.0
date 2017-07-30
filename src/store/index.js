import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//===================================================================state
const state = {
  //是否全屏显示播放器
  fullPlay: false,
  //当前歌曲信息
  songMsg:{},
  //当前播放队列
  songList:[],
  //是否在播放歌曲
  isPlay:false,
  //当前播放歌曲在歌曲列表中的索引
  curSongIndex:0,
}

//===================================================================mutations
const mutations = {
  //选择歌曲
  selectPlaySong(state,songMsg) {
    state.songMsg=songMsg;
  },
  changeSongList(state,songlist){
    state.songList=songlist;
  },
  fullPlay(state){
    state.fullPlay = true;
  },
  closeFullPlay(state){
    state.fullPlay = false;
  },
  changePlayeState(state,flg){
    state.isPlay=flg;
  },
  changeCurSongIndex(state,index){
    state.curSongIndex=index;
  }
}

//===================================================================actions
const actions = {
  //选择歌曲
  dispatchcgflae({commit},{songMsg,songList,index}){
    commit('fullPlay');
    commit('changePlayeState',true);
    commit('selectPlaySong',songMsg);
    commit('changeCurSongIndex',index);
    commit('changeSongList',songList);

  }
}

//===================================================================getters
const getters = {
  resfullPlay(state){
    return state.flae;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

