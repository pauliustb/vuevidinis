import axios from 'axios';


const state = {
};

const mutations = {

};


const actions = {
  // eslint-disable-next-line
  setOpen({ commit }, data) {
    return axios.post('/wp-json/data/v1/statistic_open/', {
      ...data,
    }).then(() => {
    });
  },
};

const getters = {


};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
