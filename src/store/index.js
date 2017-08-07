import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//===================================================================state
const state = {
  //是否显示loading
  isShowLoading:false,
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
  mySongList:window.localStorage.getItem('mySongList')?JSON.parse(window.localStorage.getItem('mySongList')):[],
  //是否显示播放列表
  isShowMySongList:false,
  //历史搜索
  historyKeyword:window.localStorage.getItem('historyKeyword')?window.localStorage.getItem('historyKeyword').split(','):[],
  //弹框类型 toast , alert
}

//===================================================================mutations
const mutations = {
  ShowLoading(state){
    state.isShowLoading=true;
  },
  HideLoading(state){
    state.isShowLoading=false;
  },
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
  //添加到我的收藏
  AddToMySongList(state,song){
    var flg=true;
    var ind=0;
    state.mySongList.forEach((el,i)=>{
      if(el.songid===song.songid){
        flg=false;
        ind=i;
      }
    })
    if(flg) {
      state.mySongList.unshift(song);
      window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
    }else{
      state.mySongList.splice(ind,1)
      window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
    }

  },
  //我的收藏中删除
  delFromMySongList(state,index){
    state.mySongList.splice(index,1)
    window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
    layer.open({content: '删除成功',skin: 'msg',time: 1});
  },
  //清空我的收藏
  clearMySongList(state){
    state.mySongList=[];
    window.localStorage.setItem('mySongList',JSON.stringify(state.mySongList))
  },
  toggleShowMySongList(state){
    if(state.songList.length>0){
      state.isShowMySongList=!state.isShowMySongList;
    }else{
      layer.open({
        content: '还没有收藏哦~'
        ,btn: '我知道了'
      });
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
    layer.open({content: '已添到播放列表',skin: 'msg',time: 1});
    if(flg) {
      state.songList.push(song);
    }
  },
  //播放列表中删除
  delFromSongList(state,index){
    if(index!==state.curSongIndex){
      state.songList.splice(index,1)
      layer.open({content: '删除成功',skin: 'msg',time: 1});
    }else{
      layer.open({
        content: '该歌曲正在播放，无法删除'
        ,btn: '我知道了'
      });
    }
  },
  //清空播放列表
  clearSongList(state){
    state.songList=[];
  },
  //添加搜索历史记录
  addHistoryKey(state,key){
    var flg=true;
    state.historyKeyword.forEach((el)=>{
      if(el===key){
        flg=false;
      }
    })
    if(flg){
      state.historyKeyword.unshift(key);
      window.localStorage.setItem('historyKeyword',state.historyKeyword)
    }

  },
  //删除搜索历史记录
  delFromHistory(state,index){
    state.historyKeyword.splice(index,1);
    window.localStorage.setItem('historyKeyword',state.historyKeyword)
  },
  //清空 搜索历史记录
  clearHistory(state){
    state.historyKeyword=[];
    window.localStorage.setItem('historyKeyword',state.historyKeyword)
  }
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
  },
  myCollectIds(state){
    var arr=[];
    state.mySongList.forEach((el)=>{
      arr.push(el.songid)
    })
    return arr;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

