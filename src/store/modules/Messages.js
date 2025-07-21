import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  page: 0,
  total: 1,
  keyword: '',
  loading: true,
  rq: [],
  hasUnreadMessages: false,
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
    if (item) item.open = true;
  },
  addrequest(state, data) {
    state.rq.push(data);
  },
  setHasUnreadMessages(state, value) {
    state.hasUnreadMessages = value;
  }
};

const actions = {
  get({ commit, rootState }) {
    commit('setLoading', true);

    const request = axios.CancelToken.source();
    commit('addrequest', request);

    return axios.get(`/wp-json/data/v1/get_conversations/`, {
      cancelToken: request.token
    }).then((rsp) => {
      commit('setLoading', false);

      if (rsp.data) {
        commit('setList', rsp.data);

        const role = rootState.user.user.role;

        let hasUnread = false;

        for (const convo of rsp.data) {
          if ((role === 'user' || role === 'frontuser') && convo.is_user_read === "0") {
            hasUnread = true;
            break;
          }
          if (role === 'mentorius' && convo.is_mentor_read === "0") {
            hasUnread = true;
            break;
          }
        }

        commit('setHasUnreadMessages', hasUnread);
      }
    }).catch((error) => {
      console.error('Error fetching conversations:', error);
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
  }
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
  hasUnreadMessages(state) {
    return state.hasUnreadMessages;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
