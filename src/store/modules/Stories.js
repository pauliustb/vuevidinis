import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  page: 0,
  total: 1,
  single: false,
};

const mutations = {
  list(state, data) {
    state.list = state.list.concat(data);
  },
  clear(state) {
    state.list = [];
  },
  total(state, data) {
    state.total = data;
  },
  addPage(state) {
    state.page += 1;
  },
  page(state, data) {
    state.page = data;
  },
  single(state, data) {
    state.single = data;
  },
};

const actions = {
  get({ commit }) {
    if (state.list.length < state.total) {
      return axios.get(`/wp-json/data/v1/get_success_stories/${state.page}/?lang=${i18n.global.locale.value}`, {
      }).then((rsp) => {
        if (rsp.data) {
          commit('addPage');
          commit('list', rsp.data.list);
          commit('total', rsp.data.total);
        }
      });
    }
    return true;
  },
  getSingle({ commit }, slug) {
    commit('single', false);
    return axios.get(`/wp-json/data/v1/success_stories/${slug}?lang=${i18n.global.locale.value}`, {
    }).then((rsp) => {
      if (rsp.data) {
        commit('single', rsp.data.data);
      }
    });
  },
};

const getters = {
  list(state) {
    return state.list;
  },
  page(state) {
    return state.page;
  },
  total(state) {
    return state.total;
  },
  single(state) {
    return state.single;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
