/* eslint-disable no-unused-vars */
import axios from 'axios';
import i18n from '@/i18n';
import router from '@/router';
import { toRaw } from 'vue';


import NotFound from '@/views/NotFound.vue';
import DefaultPage from '@/views/DefaultPage.vue';
import UserEvents from '@/views/Events.vue';
import UserStories from '@/views/Stories.vue';
import MentoriaiStatic from '@/views/MentoriaiStatic.vue';
import MentoriaiDynamic from '@/views/MentoriaiDynamic.vue';
import Messages from '@/views/Messages.vue';
import VeiksmuPlanas from '@/views/VeiksmuPlanas.vue';
import Profile from '@/views/userActions/Profile.vue';
import Login from '@/views/userActions/Login.vue';
import Register from '@/views/userActions/Register.vue';
import LostPassword from '@/views/userActions/LostPassword.vue';
import ResetPass from '@/views/userActions/ResetPass.vue';
import RegisterGauk from '@/views/userActions/RegisterGauk.vue';
import RegisterDuok from '@/views/userActions/RegisterDuok.vue';
import Results from '@/views/userActions/Results.vue';

const redirectGuest = [
  { role: 'guest', access: false, redirect: 'Login' },
];

const redirectUser = [
  { role: 'mentorius', access: false, redirect: 'Profile' },
  { role: 'frontuser', access: false, redirect: 'Profile' },
  { role: 'neapsisprendes', access: false, redirect: 'Profile' },
];

function getComponentName(name) {
  switch (name) {
    case 'Events': return UserEvents;
    case 'Stories': return UserStories;
    case 'MentoriaiStatic': return MentoriaiStatic;
    case 'MentoriaiDynamic': return MentoriaiDynamic;
    case 'Messages': return Messages;
    case 'VeiksmuPlanas': return VeiksmuPlanas;
    case 'PrivatumoPolitika': return DefaultPage;
    case 'Results': return Results;
    case 'Login': return Login;
    case 'Register': return Register;
    case 'LostPassword': return LostPassword;
    case 'ResetPass': return ResetPass;
    case 'Profile': return Profile;
    case 'RegisterGauk': return RegisterGauk;
    case 'RegisterDuok': return RegisterDuok;
    default: return DefaultPage;
  }
}


function getComponentMeta(data) {
  const rawData = toRaw(data);
  if (!rawData.pageid) {
    console.error("Route meta.id is missing for", rawData);
  }

  let meta = {
    title: rawData.title,
    id: rawData.pageid || `missing-${rawData.type}`,
    post_parent: rawData.post_parent,
  };


  switch (rawData.type) {
    case 'Messages':
    case 'VeiksmuPlanas':
    case 'Profile':
    case 'Results':
      meta.permissions = redirectGuest;
      break;
    case 'Login':
    case 'RegisterGauk':
    case 'RegisterDuok':
    case 'LostPassword':
    case 'Register':
    case 'ResetPass':
      meta.permissions = redirectUser;
      break;
  }

  return meta;
}

const mutations = {
  addRoute(state, data) {
    let routePath = data.url;

    if (data.type === 'default' && data.url == null) {
      routePath = `/default/${data.pageid}`;
    }

    const route = {
      path: routePath,
      name: data.type || `route-${data.pageid}`,
      component: getComponentName(data.type),
      meta: getComponentMeta(data),
    };

    const existingRoute = router.getRoutes().find(route => route.path === data.url);
    if (!existingRoute) {
      router.addRoute(route);
    }
  },

  add404Route(state) {
    const notFoundRoute = {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    };
    router.addRoute(notFoundRoute);
  },
};

const actions = {
  getRoutes({ commit }) {
    axios.get(`/wp-json/data/v1/get_router/?lang=${i18n.global.locale.value}`)
      .then((rsp) => {
        if (rsp.data) {
          rsp.data.pages.forEach((e) => {
            commit('addRoute', e);
          });
        }
      });
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
};
