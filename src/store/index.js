import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  fullPlay: false
}
const mutations = {
  selectPlaySong: function (state) {
    state.fullPlay = true;
    console.log(state)
  }
}
const actions = {
  dispatchcgflae({commit}){
    commit('selectPlaySong');
  }
}
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

