import { createApp } from 'vue';
import { Vue3Mq } from "vue3-mq";
import { VueSvgIconPlugin } from '@yzfe/vue-svgicon';
import '@yzfe/svgicon/lib/svgicon.css';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'babel-polyfill';
import '@yzfe/vue-svgicon-polyfill';
import VueGtag from 'vue-gtag';
import Cookies from 'js-cookie';
import i18n from './i18n';
import VueClickAway from 'vue3-click-away';
import Popper from "vue3-popper";
import { VueReCaptcha } from 'vue-recaptcha-v3'

import Loader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserHamburger from '@/components/elements/Hamburger.vue';
import UserLang from '@/components/elements/Lang.vue';
import UserInput from '@/components/elements/Userinput.vue';
import LazyImg from '@/components/elements/LazyImg.vue';
import UserChekbox from '@/components/elements/Chekbox.vue';
import DropDown from '@/components/elements/DropDown.vue';
import SelectEl from '@/components/elements/SelectEl.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';
import YesNo from '@/components/elements/YesNo.vue';
import TextAreaCounter from '@/components/elements/TextAreaCounter.vue';
import vSelect from "vue-select";
// import vSelect from 'vue-select';

const app = createApp(App).component("v-select", vSelect );
let enabled = Cookies.get('treciujusaliu') !== '0';

app.use(VueReCaptcha, { siteKey: '6LcO4NsqAAAAANStjRRXnzIr8Kszmu-_6tAy6W95' });
app.use(i18n);
app.use(VueGtag, { config: { id: 'G-01CZP75M2J' }, enabled });
app.use(store);
app.component("UserPopper", Popper);
app.use(router);
app.use(VueAxios, axios);
app.use(VueSvgIconPlugin, { tagName: 'icon' });
app.use(Vue3Mq, {
    breakpoints: {
        mobile: 0,
        desktop: 1200,
    },
});
app.provide('$mq', app.config.globalProperties.$mq);

const VueScrollTo = require('vue-scrollto');
app.use(VueScrollTo, {
    container: 'body',
    duration: 600,
    easing: 'ease',
    offset: -100,
    force: true,
    cancelable: true,
    x: false,
    y: true,
});

const globalComponents = {
    UserLoader: Loader,
    UserBtn,
    UserHamburger,
    UserLang,
    UserInput,
    LazyImg,
    UserChekbox,
    DropDown,
    SelectEl,
    UserWyswyg,
    YesNo,
    TextAreaCounter,
    // 'v-select': vSelect
};
Object.entries(globalComponents).forEach(([name, component]) => app.component(name, component));

app.use(VueClickAway);
app.config.productionTip = false;
axios.defaults.baseURL = 'https://test-mentoriai.inovacijuagentura.lt/';

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

app.config.globalProperties.$user = store.state.user;

store.dispatch('Pages/getHome')
    .then(() => router.isReady())
    .then(() => store.dispatch('user/getCurrent'))
    .then((result) => {

        if (result.status && result.user) {
            store.commit('user/setUser', { role: result.role, ...result.user });
        } else {
            store.dispatch('user/logOut');
        }
        app.mount('#app');
    })
    .catch(error => {
        console.error("Error during initialization:", error);
        app.mount('#app');
    });