import axios from 'axios';
import i18n from '@/i18n';

const state = {
  list: [],
  page: 0,
  total: 1,
  single: false,
  loading: true,
  tax: [],
  filter: {
    tax: [],
    keyword: '',
  },
  taxRq: [],
  keywordRq: [],
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
    state.tax = data;
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
  addTaxRequest(state, data) {
    state.taxRq.push(data);
  },
  removeTaxRequest(state, index) {
    state.taxRq.splice(index, 1);
  },
  addKeywordRequest(state, data) {
    state.keywordRq.push(data);
  },
  removeKeywordRequest(state, index) {
    state.keywordRq.splice(index, 1);
  },
};

const actions = {
  getAll({ commit }, { cancelToken }) {
    if (state.page === 0) {
      commit('setLoading', true);
    }
    return axios.post(
      `/wp-json/data/v1/mentoriai_static/?lang=${i18n.global.locale.value}`,
      {
        page: state.page,
        filter: state.filter,
      },
      { cancelToken: cancelToken }
    ).then((rsp) => {
      commit('setLoading', false);
      if (rsp.data) {
        commit('addPage');
        commit('list', rsp.data.list);
        commit('total', rsp.data.total);
      }
    });
  },
  getSingle({ commit }, slug) {
    commit('single', false);
    return axios.get(
      `/wp-json/data/v1/mentoriai_static_single/${slug}?lang=${i18n.global.locale.value}`,
      {}
    ).then((rsp) => {
      if (rsp.data) {
        commit('single', rsp.data.data);
      }
    });
  },
  getTax({ commit }) {
    return new Promise((resolve) => {
      if (state.tax.length === 0) {
        axios
          .get(
            `/wp-json/data/v1/mentoriai_static/tax/?lang=${i18n.global.locale.value}`
          )
          .then((rsp) => {
            if (rsp.data) {
              commit('tax', rsp.data.data);
            }
            resolve(rsp);
          })
          .catch((error) => {
            console.error('Error fetching taxonomies:', error);
            resolve(undefined);
          });
      } else {
        resolve(state.tax);
      }
    });
  },
  setFilterTax({ commit, dispatch }, data) {
    if (state.taxRq && state.taxRq.length > 0) {
      state.taxRq.forEach((e, index) => {
        e.cancel('Rewrite');
        commit('removeTaxRequest', index);
      });
    }
    commit('setFilterTax', data);
    commit('page', 0);
    commit('clear');
    const request = axios.CancelToken.source();
    commit('addTaxRequest', request);
    return dispatch('getAll', { cancelToken: request.token });
  },
  setFilterKeyword({ commit, dispatch }, data) {
    if (state.keywordRq && state.keywordRq.length > 0) {
      state.keywordRq.forEach((e, index) => {
        e.cancel('Rewrite');
        commit('removeKeywordRequest', index);
      });
    }
    commit('setFilterKeyword', data);
    commit('page', 0);
    commit('clear');
    const request = axios.CancelToken.source();
    commit('addKeywordRequest', request);
    return dispatch('getAll', { cancelToken: request.token });
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
  tax(state) {
    return state.tax;
  },
  activeTax(state) {
    return state.filter.tax;
  },
  activeKeyword(state) {
    return state.filter.keyword;
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