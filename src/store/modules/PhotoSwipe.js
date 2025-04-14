const state = {
  options: {
    open: false,
    index: 0,
    items: [],
  },
};

const mutations = {
  SET_OPTIONS(state, data) {
    state.options = data;
  },
};


const actions = {
  set({ commit }, info) {
    if (info === false) {
      info = {
        open: false,
        index: 0,
        items: [],
      };
    }
    commit('SET_OPTIONS', info);
  },
};

const getters = {
  open(state) {
    return state.options.open;
  },
  index(state) {
    return state.options.index;
  },
  items(state) {
    return state.options.items;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
