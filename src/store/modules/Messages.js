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
  removerequest(state, index) {
    state.rq.splice(index, 1);
  },
  setCount(state, data) {
    state.unreadmessages = data;
  },
};

const actions = {
  get({ commit }) {
    if (state.page === 0) {
      commit('setLoading', true);
    }
    const request = axios.CancelToken.source();
    commit('addrequest', request);
    return axios.post(`/wp-json/data/v1/get_messages/${state.page}/?lang=${i18n.global.locale.value}`, {
      keyword: state.keyword,
    }, { cancelToken: request.token }).then((rsp) => {
      commit('setLoading', false);
      if (rsp.data) {
        commit('addPage');
        commit('list', rsp.data.list);
        commit('total', rsp.data.total);
      }
    });
  },
  getUnreadMessagesCount({ commit }) {
    return axios.get(`/wp-json/data/v1/get_messages_status/?lang=${i18n.global.locale.value}`, {
    }).then((rsp) => {
      if (rsp.data) {
        commit('setCount', rsp.data.total);
        return rsp.data.total;
      }
    });
  },
  setKeyword({ commit, dispatch }, data) {
    commit('setKeyword', data);
    commit('page', 0);
    commit('clear');
    return dispatch('get');
  },
  open({ commit }, id) { // eslint-disable-line
    commit('openmsg', id);
    return axios.post(`/wp-json/data/v1/message_open/?lang=${i18n.global.locale.value}`, {
      id,
    }).then(() => {
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
  keyword() {
    return state.keyword;
  },
  loading(state) {
    return state.loading;
  },
  unreadmessages(state) {
    return state.unreadmessages;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
