<template lang="pug">
  div.menu(v-click-away="closeHamburger" :class="{min: min}")
    div.full-container(:class="{connected: user.role !== 'guest'}")
      div.logo
        router-link(v-bind:to="'/'+lang" active-class="active")
          img(src="/img/logo2.png" alt="Logo")
      MqResponsive(target="desktop").navigation
        div.list(v-if="!$mq || ($mq && !$mq.hamburger)")
          ul(v-if="menu && menu.length > 0")
            li(v-for="item in menu" :key="item.id")
              router-link(v-bind:to="item.url" active-class="active") {{ item.title }}
        
      div.user
        MqResponsive(target="desktop")
          div(v-if="user.role === 'guest'").notc
            UserBtn(:active="false" :to="{name:'Login'}" color="white" :disabled="false" :loading="false" :uppercase="false" :text="$t('login')" text-align="center")
            UserBtn(:active="false" :to="{name:'Register'}" color="blue" :disabled="false" :loading="false" :uppercase="false" :text="$t('register')" text-align="center")
        div(v-if="user.role !== 'guest'").prisijunges
          router-link(v-if="user.status === 'public'" :to="{name:'VeiksmuPlanas'}" active-class="active" :title="$t('customMenu.mentorystesplanas')").rez
            div.menu-planas
              icon(:data="mentorystesplanasData" class="veiksmo-planas" color="#5A98C8" width="20" height="18")
              div.unread-notification(v-if="unreadplans > 0")
          router-link(v-if="user.role === 'mentorius' && user.status === 'public'" :to="{name:'Results'}" active-class="active" :title="$t('customMenu.statistika')").rez
            icon(:data="resultData" color="#5A98C8" width="18" height="15")
          router-link(v-if="user.status === 'public'" :to="{name:'zinutes'}" active-class="active" :title="$t('customMenu.zinutes')") 
            icon(v-if="this.$user.unreadmessages > 0" :data="messagesnewData" color="#FFD400 #5A98C8" width="20" height="15")
            icon(v-else :data="messagesData" color="#5A98C8" width="20" height="15")
          div.profile
            DropDown(color="blue")
              div(v-if="user.img").profileimg
                img(:src="user.img && user.img.full ? user.img.full : '/img/profile.png'" width="40" height="40")
              div.profileimg(v-else)
                img(src="/img/profile.png" width="40" height="40")
              template(v-slot:menu)
                ul
                  li
                    router-link(:to="{name:'Profile'}") {{$t('user.profile')}}
                  li
                    a(v-on:click.prevent="logout" href="#") {{$t('user.logout')}}
      MqResponsive(target="mobile")
        div.hamburger(:key="hamburgerKey")
            UserHamburger(v-on:click.native="togglemenu" :active="activeHamburger")
    transition(name="menu")
      div.mobilemenu(v-if="activeHamburger")
        ul(v-if="menu && menu.length > 0")
          li(v-for="item in menu" :key="item.id")
            router-link(:to="item.url" active-class="active") {{ item.title }}
        div.usermenu(v-if="user.role === 'guest'")
          div
            UserBtn(:active="false" :to="{name:'Login'}" color="white" :disabled="false" :loading="false" :uppercase="false" :text="$t('login')" text-align="center")
          div
            UserBtn(:active="false" :to="{name:'Register'}" color="blue" :disabled="false" :loading="false" :uppercase="false" :text="$t('register')" text-align="center")
    //- pre {{ JSON.stringify(user, null, 2) }}        
</template>

<script>
import { mapGetters } from "vuex";
import { directive as vClickAway } from "vue3-click-away";
import { MqResponsive } from 'vue3-mq';
import UserLang from "@/components/elements/Lang.vue";
import UserBtn from "@/components/elements/Btn.vue";
import UserHamburger from "@/components/elements/Hamburger.vue";
import DropDown from "@/components/elements/DropDown.vue";
import mentorystesplanasData from '@/assets/svg/mentorystes-planas.svg';
import resultData from '@/assets/svg/result.svg';
import messagesnewData from '@/assets/svg/messages-new.svg';
import messagesData from '@/assets/svg/messages.svg';


export default {
  name: "UserMenu",
  inject: ['$mq'],
  components: {
    UserHamburger,
    UserBtn,
    UserLang,
    DropDown,
    MqResponsive,
  },
  directives: {
    vClickAway,
  },
  data() {
    return {
      mentorystesplanasData,
      resultData,
      messagesnewData,
      messagesData,
      min: false,
      hamburgerKey: 0, // Pridėta key savybė
    };
  },
  computed: {
    ...mapGetters("Menu", {
      menu: "list",
      activeHamburger: "hamburger",
    }),
    ...mapGetters("user", {
      user: "user",
      unreadmessages: "unreadmessages",
      unreadplans: "unreadplans",
    }),
    mqIsReady() {
      return this.mq !== undefined;
    },
    lang() {
      return this.$i18n.locale === "lt" ? "" : "en";
    },
    safeActiveHamburger() {
      return this.activeHamburger !== undefined ? this.activeHamburger : false;
    },
  },
  async mounted() {
    setTimeout(() => {
      if (this.mqIsReady) {
        this.hamburgerKey++;
      }
    }, 100);
    // await this.$store.dispatch('user/getUnreadMessages');
    await this.$store.dispatch('user/getUnreadPlans');
  },
  methods: {
    closeHamburger() {
      if (this.safeActiveHamburger === true) {
        this.$store.commit("Menu/closeHamburger");
      }
    },
    togglemenu() {
      this.$store.commit("Menu/toggleHamburger");
    },
    logout() {
      this.$store.dispatch("user/logOut").then(() => {
        this.$router.push({ name: "Home" });
      });
    },
  },
  mutations: {
    toggleHamburger(state) {
      state.hamburger = !state.hamburger;
    },
  },
  created() {
    this.$store.dispatch("Menu/getMenu", this.$i18n.locale);
    // this.$store.dispatch('messages/getUnreadMessagesCount');
    this.$store.dispatch('VeiksmuPlanas/getUnreadPlansCount');
    window.onscroll = () => {
      if (window.scrollY === 0) {
        this.min = false;
      } else {
        this.min = true;
      }
    };
  },
};
</script>

<style scoped lang="stylus">
.menu-planas
  position relative
  .unread-notification
    position absolute
    top 2px
    right 2px
    width 5px
    height 5px
    background #FFD400
    border-radius 99px

.menu
  width 100%
  position fixed
  left 0px
  top 0px
  background-color #fff
  z-index 100

  &.min
    background-color #fff
    .full-container
      height 60px

  .full-container
    transition 0.5s all
    height 100px
    align-items center
    display inline-flex

    .navigation 
      display flex
      width 100%
      justify-content space-between
      align-items center

  &.connected
    display grid
    grid-template-columns 130px auto 50px 240px
    gap 40px

    @media(max-width 1200px)
      grid-template-columns auto 100px 40px
      gap 10px

  @media(max-width 1200px)
    .full-container
      display flex
      flex-wrap wrap
      gap 30px
      justify-content space-between
      height 60px

  .logo
    img
      max-width 122px
      width 100%

    @media(max-width 400px)
      max-width 60px

  @media(max-width 400px)
    .logo
      width 60px

  .user .notc
    display flex
    justify-content space-between
    gap: 10px 
    a
      max-width 114px

  .list
    margin-left: 40px
    ul
      display flex
      li
        margin-right 30px

        &:last-child
          margin-right 0px

        a
          font-size 13px
          line-height 13px
          color #132458
          font-weight 600
          font-family 'Spartan', sans-serif
          transition 0.3s all

          &:hover, &:focus
            color #5A98C8

  .hamburger
    position relative
    z-index 102

.mobilemenu
  -webkit-overflow-scrolling touch
  position fixed
  top 0px
  right 0px
  width 100%
  max-width 300px
  background-color #FFFFFF
  z-index 101
  height 100%
  padding-top 70px
  padding-left 40px
  padding-right 40px
  padding-bottom 40px
  overflow auto

  .usermenu
    margin-bottom 70px
    display flex
    flex-wrap nowrap
    gap 20px
    justify-content space-between

  .lang
    max-width 70px

  ul
    margin-bottom 30px

    li
      margin-bottom 20px

      &:last-child
        margin-bottom 0px

    a
      font-size 16px
      line-height 16px
      font-weight 700
      font-family 'Spartan', sans-serif
      letter-spacing -1px

.prisijunges
  display flex
  align-items center
  justify-content flex-end

  .rez
    margin-right 30px

    @media(max-width 1200px)
      margin-right 20px

  .profile
    width 40px
    height 40px
    margin-left 30px

    @media(max-width 1200px)
      margin-left 20px

    .profileimg
      width 40px
      height 40px
      border-radius 50%
      overflow hidden

      &.noimg
        background-color #ccc

      >>>img
        width 100%
        height 100%
        object-fit cover

.menu-enter-active
  transition all 0.2s ease-in

.menu-leave-active
  transition all 0.2s ease-out

.menu-enter, .menu-leave-to
  transform translateX(100%)

</style>
