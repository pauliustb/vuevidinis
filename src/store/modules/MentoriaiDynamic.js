import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  page: 0,
  total: 1,
  single: null,
  loading: true,
  tax: [],
  filter: {
    tax: [],
    keyword: '',
  },
  rq: [],
};

const mutations = {
  list(state, data) {
    state.list = state.list.concat(data);
  },
  clear(state) {
    state.list = [];
  },
  total(state, data) {
    if (data === 0) {
      state.list = [];
    }
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
  tax(state, data) {
    // state.tax = [...data.old, ...data.new];
    state.tax = data.new;
  },
  setFilterTax(state, data) {
    const findIndex = state.filter.tax.findIndex((e) => e.slug === data.slug);
    if (findIndex === -1) {
      state.filter.tax.push(data);
    } else {
      state.filter.tax.splice(findIndex, 1);
    }
  },
  setFilterKeyword(state, data) {
    state.filter.keyword = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  addrequest(state, data) {
    state.rq.push(data);
  },
  removerequest(state, index) {
    state.rq.splice(index, 1);
  },
};

const actions = {
  async getAll({ commit, state }) {
    if (state.page === 0) {
      commit('setLoading', true);
    }
    const request = axios.CancelToken.source();
    commit('addrequest', request);

    try {
      const response = await axios.post(
        `/wp-json/data/v1/mentoriai_dynamic/?lang=${i18n.global.locale.value}`,
        {
          page: state.page,
          filter: state.filter,
        },
        { cancelToken: request.token }
      );

      commit('setLoading', false);
      if (response.data) {
        commit('addPage');
        commit('list', response.data.list);
        commit('total', response.data.total);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      commit('setLoading', false);
    }
  },

  async getSingle({ commit }, slug) {
    commit('single', null);

    try {
      const response = await axios.get(
        `/wp-json/data/v1/mentoriai_dynamic_single/${slug}?lang=${i18n.global.locale.value}`
      );

      if (response.data && response.data.data) {
        commit('single', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching single item:', error);
    }
  },

  async getTax({ commit, state }) {
    if (state.tax.length === 0) {
      try {
        const response = await axios.get(
          `/wp-json/data/v1/mentoriai_dynamic/tax/?lang=${i18n.global.locale.value}`
        );

        if (response.data) {
          commit('tax', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching taxonomies:', error);
      }
    }
  },

  async setFilterTax({ commit, dispatch, state }, data) {
    if (state.rq.length > 0) {
      state.rq.forEach((request, index) => {
        request.cancel('Rewrite');
        commit('removerequest', index);
      });
    }

    commit('setFilterTax', data);
    commit('page', 0);
    commit('clear');
    return dispatch('getAll');
  },

  async setFilterKeyword({ commit, dispatch, state }, data) {
    if (state.rq.length > 0) {
      state.rq.forEach((request, index) => {
        request.cancel('Rewrite');
        commit('removerequest', index);
      });
    }

    commit('setFilterKeyword', data);
    commit('page', 0);
    commit('clear');
    return dispatch('getAll');
  },
};

const getters = {
  list: (state) => state.list,
  page: (state) => state.page,
  total: (state) => state.total,
  single: (state) => state.single,
  tax: (state) => state.tax,
  activeTax: (state) => state.filter.tax,
  activeKeyword: (state) => state.filter.keyword,
  loading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};