import axios from 'axios';
import i18n from '@/i18n';

const state = {
  home: {},
  default: null,
};

const mutations = {
  home(state, data) {
    state.home = data || {};
  },
  SET_DEFAULT(state, data) {
    state.default = data || null;
  },
};

const actions = {
  async getHome({ commit, state }) {
    if (Object.keys(state.home).length === 0) {
      try {
        const rsp = await axios.get(`/wp-json/data/v1/get_home/?lang=${i18n.global.locale.value}`);
        if (rsp.data) {
          commit('home', rsp.data.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    }
  },
  async getDefault({ commit }, id) {
    commit('SET_DEFAULT', null);
    try {
      const rsp = await axios.get(`/wp-json/data/v1/get_default/${id}/?lang=${i18n.global.locale.value}`);
      if (rsp.data && rsp.data.data) {
        commit('SET_DEFAULT', rsp.data.data);
        return rsp.data.data;
      } else {
        console.error("No data returned from server");
      }
    } catch (error) {
      console.error('Error fetching default page data:', error);
    }

    return null;
  },
};

const getters = {
  home(state) {
    return state.home;
  },
  default(state) {
    return state.default || null;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
