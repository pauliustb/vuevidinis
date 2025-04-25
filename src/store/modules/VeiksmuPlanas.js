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
  single: false,
  unreadplans: 0,
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
  openplan(state, id) {
    const item = state.list.find((e) => e.id === id);
    if (item) item.open = true;
  },
  addrequest(state, data) {
    state.rq.push(data);
  },
  removerequest(state, index) {
    state.rq.splice(index, 1);
  },
  setCount(state, data) {
    state.unreadplans = data;
  },
  single(state, data) {
    state.single = data;
  },
};

const actions = {
  async get({ commit, state }, forcereload) {
    if (forcereload) {
      commit('clear');
      commit('contactedMentors', []);
      commit('total', 0);
      commit('page', 0);
    }
    if (state.page === 0) {
      commit('setLoading', true);
    }

    const request = axios.CancelToken.source();
    commit('addrequest', request);

    try {
      const rsp = await axios.post(
        `/wp-json/data/v1/get_plans/${state.page}/?lang=${i18n.global.locale.value}`,
        { keyword: state.keyword },
        { cancelToken: request.token }
      );

      commit('setLoading', false);

      if (rsp.data) {
        commit('addPage');
        commit('list', rsp.data.list);
        commit('contactedMentors', rsp.data.contactedMentors);
        commit('total', rsp.data.total);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request canceled:', error.message);
      } else {
        console.error('Error fetching plans:', error);
        commit('setLoading', false);
      }
    }
  },

  getUnreadPlansCount({ commit }) {
    return axios.get(`/wp-json/data/v1/get_plans_status/?lang=${i18n.global.locale.value}`, {
    }).then((rsp) => {
      if (rsp.data) {
        commit('setCount', rsp.data.total);
      }
    });
  },

  async setKeyword({ commit, dispatch }, data) {
    if (state.rq && state.rq.length > 0) {
      state.rq.forEach((e, index) => {
        e.cancel('Rewrite');
        commit('removerequest', index);
      });
    }

    commit('setKeyword', data);
    commit('page', 0);
    commit('clear');
    return dispatch('get');
  },

  async open({ commit }, id) {
    try {
      await axios.post(`/wp-json/data/v1/plan_open/?lang=${i18n.global.locale.value}`, { id });
      commit('openplan', id);
    } catch (error) {
      console.error('Error opening plan:', error);
    }
  },

  async getSingle({ commit }, id) {
    commit('single', false);
    commit('setLoading', true);
    try {
      const rsp = await axios.get(`/wp-json/data/v1/veiksmu-planai/${id}?lang=${i18n.global.locale.value}`);
      if (rsp.data) {
        commit('single', rsp.data.data);
        commit('setLoading', false);
      }
    } catch (error) {
      console.error('Error fetching single plan:', error);
    }
  },

  async getSingleUpdate({ commit }, id) {
    try {
      const rsp = await axios.get(`/wp-json/data/v1/veiksmu-planai/${id}?lang=${i18n.global.locale.value}`);
      if (rsp.data) {
        commit('single', rsp.data.data);
      }
    } catch (error) {
      console.error('Error fetching single update:', error);
    }
  },

  async markPlanAsCompleted(_, data) {
    try {
      const rsp = await axios.post('/wp-json/data/v1/mark_plan_as_completed/', data);
      if (rsp.data && rsp.data.status === true) {
        return { status: true };
      }
      return rsp.data;
    } catch (error) {
      return { status: false, msg: error.response?.data.message || 'Connection error' };
    }
  },

  async updateStep(_, data) {
    try {
      const rsp = await axios.post('/wp-json/data/v1/update_step/', data);
      if (rsp.data && rsp.data.status === true) {
        return { status: true };
      }
      return rsp.data;
    } catch (error) {
      return { status: false, msg: error.response?.data.message || 'Connection error' };
    }
  },

  async saveNewPlan(_, data) {
    try {
      const rsp = await axios.post('/wp-json/data/v1/save_new_plan/', data);
      if (rsp.data && rsp.data.status === true) {
        return { status: true };
      }
      return rsp.data;
    } catch (error) {
      return { status: false, msg: error.response?.data.message || 'Connection error' };
    }
  },

  async markStepAsCompleted(_, data) {
    try {
      const rsp = await axios.post('/wp-json/data/v1/mark_step_as_completed/', data);
      if (rsp.data && rsp.data.status === true) {
        return { status: true };
      }
      return rsp.data;
    } catch (error) {
      return { status: false, msg: error.response?.data.message || 'Connection error' };
    }
  },
};

const getters = {
  list(state) {
    return state.list;
  },
  contactedMentors(state) {
    return state.contactedMentors;
  },
  page(state) {
    return state.page;
  },
  total(state) {
    return state.total;
  },
  keyword(state) {
    return state.keyword;
  },
  loading(state) {
    return state.loading;
  },
  unreadplans(state) {
    return state.unreadplans;
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
