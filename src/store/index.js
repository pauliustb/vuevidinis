import { createStore } from 'vuex';
import user from './modules/User';
import messages from './modules/Messages';
import routes from './modules/Routes';
import Menu from './modules/Menu';
import VeiksmuPlanas from './modules/VeiksmuPlanas';
import Pages from './modules/Pages';
import MentoriaiDynamic from './modules/MentoriaiDynamic';
import Events from './modules/Events';
import Stories from './modules/Stories';
import MentoriaiStatic from './modules/MentoriaiStatic';
import Apklausa from './modules/Apklausa';
import PhotoSwipe from './modules/PhotoSwipe';
import Statistic from './modules/Statistic';

const store = createStore({
  modules: {
    user,
    messages,
    routes,
    Menu,
    VeiksmuPlanas,
    Pages,
    MentoriaiDynamic,
    Events,
    Stories,
    MentoriaiStatic,
    Apklausa,
    PhotoSwipe,
    Statistic

  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
