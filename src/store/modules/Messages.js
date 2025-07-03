import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  page: 0,
  total: 1,
  keyword: '',
  loading: true,
  rq: [],
  unreadmessages: 0,
};

const mutations = {
  setList(state, data) {
    state.list = data;
  },
  clear(state) {
    state.list = [];
  },
  page(state, data) {
    state.page = data;
  },
  setKeyword(state, data) {
    state.keyword = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  openmsg(state, id) {
    const item = state.list.find((e) => e.id === id);
    item.open = true;
  },
  addrequest(state, data) {
    state.rq.push(data);
  },
};

const actions = {
  get({ commit }) {
    commit('setLoading', true);

    const request = axios.CancelToken.source();
    commit('addrequest', request);

    return axios.get(`/wp-json/data/v1/get_conversations/`, {
      cancelToken: request.token
    }).then((rsp) => {
      commit('setLoading', false);
      if (rsp.data) {
        commit('setList', rsp.data);
      }
    }).catch(() => {
      commit('setLoading', false);
    });
  },
  send({ commit }, data) { // eslint-disable-line
    commit('page', 0);
    commit('clear');
    return axios.post(`/wp-json/data/v1/message_send/?lang=${i18n.global.locale.value}`, {
      ...data,
    }).then((rsp) => {
      return rsp.data;
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
  loading(state) {
    return state.loading;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
