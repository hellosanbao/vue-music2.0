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
  palyTypeArr:['icon-loop','icon-sjbf','icon-dqxh'],//播放模式 icon-loop：顺序播放 icon-sjbf：随机播放 icon-dqxh：单曲循环
  playType : 0,//对应palyTypeArr
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
  },
  cheangePlayType(state){
    state.playType++;
    if(state.playType>state.palyTypeArr.length-1){
      state.playType=0;
    }
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

