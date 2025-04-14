import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  single: false,
};

const mutations = {
  list(state, data) {
    state.list = data;
  },
  clear(state) {
    state.list = [];
  },
  single(state, data) {
    state.single = data;
  },
};

const actions = {
  get({ commit, state }) {
    if (state.list.length === 0) {
      return axios
        .get(`/wp-json/data/v1/get_events/?lang=${i18n.global.locale.value}`)
        .then((rsp) => {
          if (rsp && rsp.data && Array.isArray(rsp.data.list)) {
            commit('list', rsp.data.list);
            return rsp.data.list;
          } else {
            console.error('Invalid data format for events.');
            return Promise.reject('Invalid data format.');
          }
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          return Promise.reject(error);
        });
    }
    return Promise.resolve(state.list);
  },

  getSingle({ commit }, slug) {
    commit('single', false);
    return axios
      .get(`/wp-json/data/v1/events/${slug}?lang=${i18n.global.locale.value}`)
      .then((rsp) => {
        if (rsp.data) {
          commit('single', rsp.data.data);
        } else {
          console.error('No event data found for slug:', slug);
          return Promise.reject('No event data found');
        }
      })
      .catch((error) => {
        console.error('Error fetching single event:', error);
        return Promise.reject(error);
      });
  },
};

const getters = {
  list(state) {
    return state.list;
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
