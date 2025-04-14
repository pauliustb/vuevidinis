import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  contactedMentors: [],
  page: 0,
  total: 1,
  keyword: '',
  loading: true,
  rq: [],
  unreadmessages: 0,
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
  contactedMentors(state, data) {
    state.contactedMentors = data;
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
  single(state, data) {
    state.single = data;
  },
};

const actions = {
  // get({ commit }) {
  //   if (state.page === 0) {
  //     commit('setLoading', true);
  //   }
  //   const request = axios.CancelToken.source();
  //   commit('addrequest', request);
  //   return axios.post(`/wp-json/data/v1/get_plans/${state.page}/?lang=${Vue.i18n.locale()}`, {
  //     keyword: state.keyword,
  //   }, { cancelToken: request.token }).then((rsp) => {
  //     commit('setLoading', false);
  //     if (rsp.data) {
  //       commit('addPage');
  //       commit('list', rsp.data.list);
  //       commit('contactedMentors', rsp.data.contactedMentors);
  //       commit('total', rsp.data.total);
  //     }
  //   });
  // },
  // getUnreadMessagesCount({ commit }) {
  //   return axios.get(`/wp-json/data/v1/get_messages_status/?lang=${Vue.i18n.locale()}`, {
  //   }).then((rsp) => {
  //     if (rsp.data) {
  //       commit('setCount', rsp.data.total);
  //     }
  //   });
  // },
  // setKeyword({ commit, dispatch }, data) {
  //   if (state.rq && state.rq.length > 0) {
  //     state.rq.forEach((e, index) => {
  //       e.cancel('Rewrite');
  //       commit('removerequest', index);
  //     });
  //   }
  //   commit('setKeyword', data);
  //   commit('page', 0);
  //   commit('clear');
  //   return dispatch('get');
  // },
  // open({ commit }, id) { // eslint-disable-line
  //  commit('openmsg', id);
  //  return axios.post(`/wp-json/data/v1/message_open/?lang=${Vue.i18n.locale()}`, {
  //    id,
  //  }).then(() => {
  //  });
  // },
  getSingle({ commit }, [id, userHash]) {
    commit('single', false);
    commit('setLoading', true);
    return axios.get(`/wp-json/data/v1/apklausa/${id}/${userHash}?lang=${i18n.global.locale.value}`, {
    }).then((rsp) => {
      if (rsp.data) {
        commit('single', rsp.data.data);
        commit('setLoading', false);
      }
    });
  },
  submitApklausa({ commit }, data) { // eslint-disable-line
    return axios.post('/wp-json/data/v1/submit_apklausa/', {
      ...data,
    }).then((rsp) => {
      if (rsp.data && rsp.data.status === true) {
        return { status: true };
      }
      return rsp.data;
    }).catch((error) => {
      if (error.response && error.response.data.message) {
        return { status: false, msg: 'Error' };
      }
      return { status: false, msg: 'Connection error' };
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
