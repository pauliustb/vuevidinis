import { createRouter, createWebHistory } from 'vue-router';
import i18n from './i18n';

import Home from '@/views/Home.vue';
import SingleStory from '@/views/SingleStory.vue';
import SingleEvent from '@/views/SingleEvent.vue';
import UserEvents from '@/views/Events.vue';
// eslint-disable-next-line import/no-unresolved
import SingleVeiksmuPlanas from '@/views/SingleVeiksmuPlanas.vue';
import SingleMentorius from '@/views/SingleMentorius.vue';
import SingleApklausa from '@/views/SingleApklausa.vue';
import UserLogin from '@/views/userActions/Login.vue';
import UserRegister from '@/views/userActions/Register.vue';
import UserStories from '@/views/Stories.vue';
import DefaultPage from './views/DefaultPage.vue';
import LostPassword from './views/userActions/LostPassword.vue';
import MentoriaiDynamic from './views/MentoriaiDynamic.vue';
import MentoriaiStatic from './views/MentoriaiStatic.vue';
import RegisterGauk from './views/userActions/RegisterGauk.vue';
import RegisterDuok from './views/userActions/RegisterDuok.vue';
import Messages from './views/Messages.vue';
import Profile from './views/userActions/Profile.vue';
import ResetPass from './views/userActions/ResetPass.vue';
import UserResults from './views/userActions/Results.vue';
import VeiksmuPlanas from './views/VeiksmuPlanas.vue';

const globalinfo = window.globalinfo || { lang: 'lt' };
const prefx = globalinfo.lang !== 'lt' ? `/${globalinfo.lang}` : '';

// Initial static routes
const routes = [
  {
    path: `/`,
    name: 'Home',
    component: Home,
  },
  {
    path: `/sekmes-istorijos`,
    name: 'UserStories',
    component: UserStories,
    meta: {
      id: 129,
      title: 'Sėkmės istorijos',

    },
  },
  {
    path: `/kontaktai`,
    name: 'Contacts',
    component: DefaultPage,
    meta: {
      id: 585,
      title: 'Kontaktai',
    },
  },
  {
    path: `/renginiai`,
    name: 'Events',
    component: UserEvents,
    meta: {
      id: 57,
      title: 'Renginiai',
    },
  },
  {
    path: `/e-mentoriai`,
    name: 'MentoriaiDynamic',
    component: MentoriaiDynamic,
    meta: {
      id: 178,
      title: 'Mentoriai „Spiečiuose“',
    },
  },
  {
    path: `/e-mentoriai`,
    name: 'MentoriaiDynamic',
    component: MentoriaiDynamic,
    meta: {
      id: 178,
      title: 'E. mentoriai',
    },
  },
  {
    path: `/mentoriai-spieciuose`,
    name: 'MentoriaiStatic',
    component: MentoriaiStatic,
    meta: {
      id: 175,
      title: 'Mentoriai „Spiečiuose“',
    },
  },
  {
    path: `/apie-projekta`,
    name: 'ApieProjektą',
    component: DefaultPage,
    meta: {
      id: 296,
      title: 'Apie projektą',
    },
  },
  {
    path: `/gauk-mentoryste`,
    name: 'GaukMentorystę',
    component: RegisterGauk,
    meta: {
      id: 496,
      title: 'Gauk mentorystę',
    },
  },
  {
    path: `/tapk-mentoriumi`,
    name: 'TapkMentoriumi',
    component: RegisterDuok,
    meta: {
      id: 498,
      title: 'Tapk mentoriumi',
    },
  },
  {
    path: `/kodel-verta-buti-mentoriumi-ir-kas-gali-juo-tapti`,
    name: 'KodėlVertaBūtiMentoriumi',
    component: DefaultPage,
    meta: {
      id: 1222,
      title: 'Kodėl verta būti mentoriumi ir kas gali juo tapti?',
    },
  },
  {
    path: `/kodel-verta-gauti-mentoryste-ir-kas-gali-ja-gauti`,
    name: 'KodėlVertaGautiMentoryste',
    component: DefaultPage,
    meta: {
      id: 1231,
      title: 'Kodėl verta gauti mentorystę ir kas gali ją gauti?',
    },
  },
  {
    path: `/e-mentoryste`,
    name: 'E-Mentoryste',
    component: DefaultPage,
    meta: {
      id: 246,
      title: 'E. mentorystė',
    },
  },
  {
    path: `/mentoryste-spieciuose`,
    name: 'MentorysteSpiečiuose',
    component: DefaultPage,
    meta: {
      id: 250,
      title: 'Mentorystė spiečiuose',
    },
  },
  {
    path: `/prisijungti`,
    name: 'Login',
    component: UserLogin,
    meta: {
      id: 231,
      title: 'Prisijungti',
    },
  },
  {
    path: `/registruotis`,
    name: 'Register',
    component: UserRegister,
    meta: {
      id: 209,
      title: 'Registruotis',
    },
  },
  {
    path: `/priminti-slaptazodi`,
    name: 'LostPassword',
    component: LostPassword,
    meta: {
      id: 492,
      title: 'Priminti slaptažodį',
    },
  },
  {
    path: `/priminti-slaptazodi`,
    name: 'LostPassword',
    component: LostPassword,
    meta: {
      id: 492,
      title: 'Priminti slaptažodį',
    },
  },
  // {
  //   path: `/privatumo-politika`,
  //   name: 'PrivatumoPolitika',
  //   component: DefaultPage,
  //   meta: {
  //     title: 'Privatumo politika',
  //   },
  // },
  {
    path: `/zinutes`,
    name: 'zinutes',
    component: Messages,
    meta: {
      id: 457,
      title: 'Žinutės',
    },
  },
  {
    path: `/profilis`,
    name: 'Profilis',
    component: Profile,
    meta: {
      id: 212,
      title: 'Profilis',
    },
  },
  {
    path: `/atstatyti-slaptazodi`,
    name: 'Atstatyti slaptažodį',
    component: ResetPass,
    meta: {
      id: 494,
      title: 'Atstatyti slaptažodį',
    },
  },
  {
    path: `/rezultatai`,
    name: 'Results',
    component: UserResults,
    meta: {
      id: 876,
      title: 'Rezultatai',
    },
  },
  {
    path: `/veiksmu-planas`,
    name: 'VeiksmuPlanas',
    component: VeiksmuPlanas,
    meta: {
      id: 3109,
      title: 'Mentorystės planas',
    },
  },
  {
    path: `${prefx}/success-stories/:slug`,
    name: 'SingleStory',
    component: SingleStory,
  },
  {
    path: `${prefx}/event/:slug`,
    name: 'SingleEvent',
    component: SingleEvent,
  },
  {
    path: `${prefx}/veiksmu-planai/:id`,
    name: 'SingleVeiksmuPlanas',
    component: SingleVeiksmuPlanas,
  },
  {
    path: `${prefx}/apklausa/:id/:userHash`,
    name: 'SingleApklausa',
    component: SingleApklausa,
  },
  {
    path: `${prefx}/mentorius/:slug`,
    name: 'SingleDynamicMentorius',
    component: SingleMentorius,
  },
  {
    path: `${prefx}/mentoriai-spieciuose/:slug`,
    name: 'SingleStaticMentorius',
    component: SingleMentorius,
  },
  {
    path: `${prefx}/mentoriai-spieciuose/:slug`,
    name: 'SingleStaticMentorius',
    component: SingleMentorius,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to?.meta?.title) {
      document.title = `${to.meta.title} | Mentoriai`;
    }
    if (savedPosition) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(savedPosition);
        });
      });
    }
    if (from && from.name === to.name && to.query && Object.keys(to.query).length !== 0) {
      return false;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const lang = from.path.startsWith('/en') ? 'en' : 'lt';
  i18n.global.locale.value = lang;
  next();
});

export default router;