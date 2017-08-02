import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//===================================================================state
const state = {
  //是否全屏显示播放器
  fullPlay: false,
  //当前歌曲信息
  songMsg:{"songname":"Wicked Wonderland 2014","interval":217,"singer":[{"id":197253,"mid":"0036kS5G03FcGm","name":"Martin Tungevaag"}],"songid":7240620,"albummid":"003bxexB3RGado"},
  //当前播放队列
  songList:[{"songname":"Wicked Wonderland 2014","interval":217,"singer":[{"id":197253,"mid":"0036kS5G03FcGm","name":"Martin Tungevaag"}],"songid":7240620,"albummid":"003bxexB3RGado"}],
  //是否在播放歌曲
  isPlay:false,
  //当前播放歌曲在歌曲列表中的索引
  curSongIndex:0,
  palyTypeArr:['icon-loop','icon-sjbf','icon-dqxh'],//播放模式 icon-loop：顺序播放 icon-sjbf：随机播放 icon-dqxh：单曲循环
  playType : 0,//对应palyTypeArr
  //我的收藏列表
  mySongList:JSON.parse(window.localStorage.getItem('mySongList'))?JSON.parse(window.localStorage.getItem('mySongList')):[],
  //是否显示播放列表
  isShowMySongList:false

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
  openfullPlay(state){
    state.fullPlay = true;
  },
  closeFullPlay(state){
    state.fullPlay = false;
  },
  changePlayeState(state,flg){
    state.isPlay=flg;
  },
  changeCurSongIndex(state,index){
    // if(index)
    state.curSongIndex=index;
  },
  cheangePlayType(state){
    state.playType++;
    if(state.playType>state.palyTypeArr.length-1){
      state.playType=0;
    }
  },
  //添加到我的播放列表
  AddToMySongList(state,song){
    var flg=true;
    state.mySongList.forEach((el)=>{
      if(el.songid===song.songid){
        flg=false;
      }
    })
    if(flg) {
      state.mySongList.unshift(song);
      window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
    }else{
      alert('该歌曲已收藏')
    }

  },
  //我的收藏中删除
  delFromMySongList(state,index){
    state.mySongList.splice(index,1)
    window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
  },
  //清空我的收藏
  clearMySongList(state){
    state.mySongList=[];
    window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
  },
  toggleShowMySongList(state){
    if(state.mySongList.length>0){
      state.isShowMySongList=!state.isShowMySongList;
    }else{
      alert('还没有收藏')
    }
  },
  //添加到播放列表
  addToSongList(state,song){
    var flg=true;
    state.songList.forEach((el)=>{
      if(el.songid===song.songid){
        flg=false;
      }
    })
    if(flg) {
      state.songList.push(song);
    }else{
      alert('该歌曲已经在播放列表中了')
    }
  },
  //播放列表中删除
  delFromSongList(state,index){
    if(index!==state.curSongIndex){
      state.songList.splice(index,1)
    }else{
      alert('该歌曲正在播放，无法删除')
    }
  },
  //清空播放列表
  clearSongList(state){
    state.songList=[];
  },
}

//===================================================================actions
const actions = {
  //选择歌曲
  dispatchcgflae({commit,state},{songMsg,songList,index}){
    commit('openfullPlay');
    commit('changePlayeState',true);
    commit('selectPlaySong',songMsg);
    commit('changeCurSongIndex',index);
    commit('changeSongList',songList);
    state.isShowMySongList=false;
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

