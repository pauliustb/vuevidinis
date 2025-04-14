<template lang="pug">
div
  div.advanced(v-on:click.prevent="openpopup")
    icon(data="@/assets/svg/settings.svg" width="22" height="22" color="#25408F")
  div.cookiebar(v-if="show")
    div.c
      div.text
        span {{$t('gdpr.start')}} 
        a(href="#" v-on:click.prevent="openpopup") {{$t('gdpr.nustatymuose')}}
        span .
      div.btns
        UserBtn(v-on:click="hide_cookie" size="min" color="blue" v-bind:href="'#'" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('gdpr.patvirtinti')" textAligin="center")
  transition(name="fade")
    div.gpdrc(v-if="show_settings")
      div.center
        UserGpdr(v-on:close="hide")
</template>
<script>
import Cookies from 'js-cookie';
import UserGpdr from './Gpdr.vue';

export default {

  name: 'UserCookie',
  components: {
    UserGpdr,
  },
  directives: {
  },
  created() {
    const hidecookiebar = Cookies.get('hidecookiebar');
    if (hidecookiebar === '1') {
      this.show = false;
    }
  },
  data() {
    return {
      show: true,
      show_settings: false,
    };
  },
  computed: {
  },
  methods: {
    openpopup() {
      this.show_settings = true;
    },
    hide() {
      this.show_settings = false;
    },
    hide_cookie() {
      this.show_settings = false;
      this.show = false;
      const treciujusaliu = Cookies.get('treciujusaliu');
      const butinieji = Cookies.get('butinieji');
      if (!treciujusaliu) {
        Cookies.set('treciujusaliu', 1, { expires: 356 });
        this.$gtag.optIn();
      }
      if (!butinieji) {
        Cookies.set('butinieji', 1, { expires: 356 });
      }

      
      Cookies.set('hidecookiebar', 1, { expires: 356 });
    },
  },
  beforeUnmount() {
  },
};
</script>

<style scoped lang="stylus">
.advanced
  width: 40px
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  right: 15px
  bottom: 5px
  z-index: 999997
  cursor: pointer

.cookiebar
  padding: 30px
  max-width: 680px
  position: fixed
  bottom: 20px
  z-index: 999998
  right: 0
  width: 100%
  min-height: 70px
  background-color: #f7f7f7
  border: 1px solid #d0d3dc
  display: flex
  flex-direction: column
  .text
    color: #333333
    font-size: 14px
    font-weight: 400
    line-height: 20px
    a
      text-decoration: underline

.c
  display: flex
  align-items: flex-end
  justify-content: space-between
  @media (max-width: 768px)
    flex-wrap: wrap
    padding-top: 15px
    justify-content: center

@media (max-width: 1200px)
  .advanced
    /* You can add specific styles here for screens smaller than 1200px if needed */
    right: 20px
    bottom: 20px

@media (max-width: 768px)
  .cookiebar
    padding: 15px
    left: 15px
    width: calc(100% - 30px)

  .c
    flex-wrap: wrap
    justify-content: center

.gpdrc
  -webkit-box-align: center
  -webkit-overflow-scrolling: touch
  align-items: center
  background: rgba(0, 0, 0, .6)
  display: flex
  height: 100%
  left: 0
  margin: auto
  overflow: auto
  padding: 50px 10px
  position: fixed
  top: 0
  width: 100%
  z-index: 999999
  .center
    display: flex
    justify-content: center
    margin: auto

</style>
