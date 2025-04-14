import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: false,
  footer: false,
  hamburger: false,
};

const mutations = {
  list(state, data) {
    state.list = data;
  },
  footer(state, data) {
    state.footer = data;
  },
  toggleHamburger(state) {
    state.hamburger = !state.hamburger;
  },
  closeHamburger(state) {
    state.hamburger = false;
  },
};

const actions = {
  getMenu({ commit }, forcereload) {
    if (state.list === false || forcereload === true) {
      axios.get(`/wp-json/data/v1/get_menu/?lang=${i18n.global.locale.value}`, {
      }).then((rsp) => {
        if (rsp.data) {
          commit('list', rsp.data.menu);
          commit('footer', rsp.data.footer);
        }
      });
    }
  },
};

const getters = {
  list(state) {
    return state.list;
  },
  footer(state) {
    return state.footer;
  },
  hamburger(state) {
    return state.hamburger;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
