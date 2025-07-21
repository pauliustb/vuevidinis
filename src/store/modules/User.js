import axios from 'axios';
import i18n from '@/i18n';


function getLocalStorageToken() {
  const tokenData = localStorage.getItem('token_data');
  if (tokenData) {
    try {
      const { token, expiry } = JSON.parse(tokenData);
      if (new Date().getTime() < expiry) {
        return token;
      } else {
        // Token has expired, remove it
        localStorage.removeItem('token_data');
        return null;
      }
    } catch (e) {
      console.error('Failed to parse token data from localStorage:', e);
      localStorage.removeItem('token_data'); // Clear corrupted data
      return null;
    }
  }
  return null;
}

const accessToken = getLocalStorageToken();
if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

const state = {
  user: { role: 'guest' },
  profile: null,
  results: null,
  token: accessToken || '',
};

const mutations = {
  setUser(state, data) {
    if(data?.status === 'draft') {
      return;
    }
    if (data?.token) {
      state.token = data.token;
      const expiryTime = new Date().getTime() + 6 * 60 * 60 * 1000;
      localStorage.setItem('token_data', JSON.stringify({ token: data.token, expiry: expiryTime }));
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    }
    state.user = { ...state.user, ...data };
  },
  setToken(state, token) {
    state.token = token;
    if (token) {
      const expiryTime = new Date().getTime() + 6 * 60 * 60 * 1000;
      localStorage.setItem('token_data', JSON.stringify({ token: token, expiry: expiryTime }));
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token_data');
      delete axios.defaults.headers.common.Authorization;
    }
  },
  setProfile(state, data) {
    if (data) {
      state.profile = { ...data }
    } else {
      console.error('setProfile: received undefined data');
    }
  },
  setResults(state, data) {
    state.results = data;
  },
  setUnreadMessages(state, unreadmessages) {
    state.unreadmessages = unreadmessages;
  },
};

const actions = {
  async register({ commit }, data) {
    try {
      const { data: rsp } = await axios.post(`/wp-json/data/v1/register/?lang=${i18n.global.locale.value}`, data);
      if (rsp.status) commit('setUser', rsp.user);
      return rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async getCurrent({ commit }) {
    const token = getLocalStorageToken();
    if (!token) {
      commit('setToken', '');
      return { status: false };
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const { data: rsp } = await axios.get('/wp-json/data/v1/user/');

      if (rsp.status) {
        commit('setUser', rsp.user);
        return { status: true, role: rsp.user.role, user: rsp.user };
      }
      commit('setToken', '');
      return { status: false };
    } catch {
      commit('setToken', '');
      return { status: false, msg: 'Connection error' };
    }
  },

  async getUserId() {
    const token = getLocalStorageToken();
    if (!token) return { status: false };

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const { data: rsp } = await axios.get('wp-json/data/v1/get-user-id/');
      if (rsp) {
        return rsp;
      }
    } catch (error) {
      return { status: false, msg: 'Connection error' };
    }
  },

  async logIn({ commit }, data) {
    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/login/', data);
      if (rsp.status) {
        commit('setUser', rsp.user);
        return { status: true };
      }
      return rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async lostPass({ commit }, data) { // eslint-disable-line
    return axios.post(`/wp-json/data/v1/lost/?lang=${i18n.global.locale.value}`, {
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

  async restPassConfirm({ commit }, data) { // eslint-disable-line
    return axios.post(`/wp-json/data/v1/lost_reset/?lang=${i18n.global.locale.value}`, {
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

  logOut({ commit }) {
    commit('setUser', { role: 'guest' });
    commit('setToken', '');
  },

  async getOauthRedirect(_, data) {
    try {
      const { data: rsp } = await axios.post('/social_auth/', {
        provider: data.type,
        usertype: data.usertype,
        lang: i18n.global.locale.value,
      });
      return rsp.status ? rsp.url : false;
    } catch {
      return false;
    }
  },

  async selectUserType({ commit }, type) {
    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/set-user-type/', { type });
      if (rsp.status) {
        commit('setUser', rsp.user);
        return { status: true };
      }
      return rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async changePass(_, password) {
    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/set-user-pass/', { password });
      return rsp.status ? { status: true } : rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async getProfile({ commit }) {
    try {
      const token = getLocalStorageToken();
      if (!token) return { status: false };

      const { data: rsp } = await axios.get('/wp-json/data/v1/user-profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (rsp.status) {
        commit('setProfile', rsp.profile);
        return { status: true };
      }
      return rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async EditCv(_, d) {
    const formData = new FormData();
    if (d.id) formData.append('id', d.id);
    Array.from(d.file).forEach((e) => {
      formData.append('files[]', e);
    });
    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/user/editcv', formData);
      return rsp.success ? { status: true, files: rsp.data.files } : { status: false, text: rsp.message };
    } catch {
      return { status: false, text: 'Connection error' };
    }
  },

  async Deletecv(_, data) {
    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/user/deletecv', data);
      return rsp.success ? { status: true, files: rsp.data.files } : { status: false, text: rsp.message };
    } catch {
      return { status: false, text: 'Connection error' };
    }
  },

  async saveProfile(_, data) {
    try {
      const token = getLocalStorageToken();
      if (!token) return { status: false };

      const { data: rsp } = await axios.post('/wp-json/data/v1/save_profile/', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return rsp.status ? { status: true } : rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async EditAvatar(_, d) {
    const formData = new FormData();
    formData.append('file', d.file);

    try {
      const { data: rsp } = await axios.post('/wp-json/data/v1/user/editavatar', formData);
      return rsp.success ? { status: true, files: rsp.data.files } : { status: false, text: rsp.message };
    } catch {
      return { status: false, text: 'Connection error' };
    }
  },

  async getResults({ commit }) {
    try {
      const { data: rsp } = await axios.get('/wp-json/data/v1/user-results/');
      if (rsp.status) {
        commit('setResults', rsp.results);
        return { status: true };
      }
      return rsp;
    } catch {
      return { status: false, msg: 'Connection error' };
    }
  },

  async getUnreadPlans({ commit, dispatch }) {
    try {
      await dispatch('VeiksmuPlanas/getUnreadPlansCount', null, { root: true });
      const unreadplans = this.$store.getters['veiksmuplanas/unreadplans'];
      commit('setUnreadPlans', unreadplans);
      return { status: true };
    } catch (error) {
      return { status: false, msg: 'Connection error' };
    }
  },
};

const getters = {
  user: state => state.user,
  profile: state => state.profile,
  results: state => state.results,
  token: state => state.token,
  unreadplans: state => state.unreadplans,
  unreadmessages: state => state.unreadmessages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};