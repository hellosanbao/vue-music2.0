import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  flae: false
}
const mutations = {
  cgflae: function (stste) {
    stste.flae = !stste.flae;
    console.log(1)
  }
}
const actions = {
  dispatchcgflae({commit}){
    commit('cgflae');
  }
}
const getters = {
  resflae(state){
    return state.flae;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

