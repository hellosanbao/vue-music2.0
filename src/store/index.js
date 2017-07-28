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
  songList:[]
}

//===================================================================mutations
const mutations = {
  //选择歌曲
  selectPlaySong(state,songMsg) {
    state.songMsg=songMsg;
  },
  changeSongList(state,songlist){
    this.songList=songlist;
  },
  fullPlay(state){
    state.fullPlay = true;
  },
  closeFullPlay(state){
    state.fullPlay = false;
  }
}

//===================================================================actions
const actions = {
  //选择歌曲
  dispatchcgflae({commit},songMsg){
    commit('selectPlaySong',songMsg);
    commit('fullPlay');
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

