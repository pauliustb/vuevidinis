<template lang="pug">
  div.single.menu-paddingtop
    div.container
      h2(v-if="storeName==='MentoriaiDynamic'") {{$t('singlementorius.ementoriai')}}
      h2(v-else) {{$t('singlementorius.smentoriai')}}
      div.info
        UserLoader(color="dark" v-if="loading")
        div(v-else)
          div(v-if="item === false") {{$t('nepatvirtintas')}}
          div(v-else)
            transition(name="intro" appear v-bind:duration="{ enter: 800, leave: 0 }"  )
              div
                div.zm
                  div.imgc
                    LazyImg(v-if="item.img" :image="item.img" :cover="true").img
                    icon(:data="triangleData" v-bind:original="true").tr
                  div.infoc
                    div
                      div.name {{item.title}}
                      div.text(v-if="item.text" v-html="item.text")
                      div.tax(v-if="item.taxs")
                        div(v-for="tax in item.taxs") {{tax}}
                      div.btnc(v-if="$route.name==='SingleDynamicMentorius'")
                        UserBtn(v-bind:href="'#'" v-on:click="email" v-bind:active="false" color="blue" v-bind:disabled="item.paskyrosUzimtumas ? true : false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('singlementorius.emailme')" textAligin="center")
                      div.busy-mentor(v-if="item.paskyrosUzimtumas")
                        div.busy-icon
                          icon(:data="calendarData" width="20" height="20" color="#FFFFFF")
                        div.busy-message
                          div.message
                            span.highlighted {{$t('demesio')}}
                            span  {{$t('mentorbusy')}}
                      div.html(v-if="item.html_text")
                        UserWyswyg(v-bind:html="item.html_text")
                    div.share(v-if="item.share_link")
                      UserShare(v-bind:url="item.share_link")
                div.slot.atsiliepimai-wrapper(v-if="item.atsiliepimai && item.atsiliepimai.length")
                  h3.lblue {{$t('singlementorius.atsiliepimai')}}
                    span.smaller  ({{item.atsiliepimai.length}})
                  MentoriusAtsiliepimai(:items="item.atsiliepimai")
                div.slot
                  h3 {{$t('singlementorius.kiti')}}
                  div.max
                    MentoriaiFilter(v-bind:store="storeName")
                  MentoriaiList(v-bind:store="storeName")
    FullScreenPopup(v-if="popup" v-on:close="closepopup")
      div.popupiinfo
        div.alert(v-if="$user.user.role === 'guest' && showlogin === false") {{$t('reikiaprisijungti')}}
          a(href="#" v-on:click.prevent="openLogin") {{$t('prisijungti')}}
          span .
        div.loginform(v-if="showlogin && $user.user.role === 'guest'")
          LoginForm(v-on:Userlogin="userrloggedin")
        div.alert(v-if="$user.user.role !== 'guest' && user.status==='draft'") {{$t('user.msgwhendraft')}}
        SendMessage(v-if="$user.user.role !== 'guest' && user.status==='public'" v-bind:userID="item.id")
  </template>
  
  <script>
  import axios from 'axios';
  import UserShare from '@/components/Blocks/Share.vue';
  import MentoriaiFilter from '@/components/Blocks/MentoriaiFilter.vue';
  import MentoriaiList from '@/components/Blocks/MentoriaiList.vue';
  import MentoriusAtsiliepimai from '@/components/Blocks/MentoriusAtsiliepimai.vue';
  import FullScreenPopup from '@/components/Blocks/FullScreenPopup.vue';
  import LoginForm from '@/components/Forms/LoginForm.vue';
  import LazyImg from '@/components/elements/LazyImg.vue';
  import UserWyswyg from '@/components/elements/Wyswyg.vue';
  import UserLoader from '@/components/elements/Loader.vue';
  import UserBtn from '@/components/elements/Btn.vue';
  import SendMessage from '@/components/Forms/SendMessage.vue';
  import { mapGetters } from 'vuex';
  import triangleData from '@/assets/svg/triangle_ornament.svg';
  import calendarData from '@/assets/svg/calendar-icon.svg';
  
  export default {
  
    name: 'SingleMentorius',
    components: {
      UserShare,
      MentoriaiFilter,
      MentoriaiList,
      FullScreenPopup,
      LoginForm,
      SendMessage,
      MentoriusAtsiliepimai,
      LazyImg,
      UserLoader,
      UserBtn,
      UserWyswyg
    },
    created() {
  
    },
    data() {
      return {
        calendarData,
        triangleData,
        loading: false,
        popup: false,
        showlogin: false,
      };
    },
    computed: {
  storeName() {
    return this.$route.name === 'SingleStaticMentorius' ? 'MentoriaiStatic' : 'MentoriaiDynamic';
  },
  item() {
    return this.$store.getters[`${this.storeName}/single`] || {}; // Fallback to an empty object
  },
  ...mapGetters('user', {
    user: 'user',
  }),
},
    mounted() {
      this.$nextTick(() => {
    
  });
    },
    methods: {
      email() {
        if(this.popup) {
          return;
        }
        this.popup = true;
      },
      closepopup() {
        this.popup = false;
      },
      openLogin() {
        this.showlogin = true;
      },
      userrloggedin() {
        this.showlogin = false;
      },
    },
    actions: {
  getSingle({ commit }, slug) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/items/${slug}`)
        .then(response => {
          commit('setSingle', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
},
    watch: {
  '$route.params.slug': {
    async handler() {
      this.loading = true;
      try {
        await this.$store.dispatch(`${this.storeName}/getSingle`, this.$route.params.slug);  // Use await here
        this.loading = false;
        if (!this.item) {
          this.$router.push({ name: 'Home' });
        } else if (this.storeName === 'MentoriaiDynamic' && this.item?.id) {
          await this.$store.dispatch('Statistic/setOpen', { id: this.item.id, taxs_id: this.item.taxs_id });
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        this.loading = false;
        this.$router.push({ name: 'Home' });
      }
    },
    immediate: true,
  },
},
  };
  </script>

<style scoped lang="stylus">
.single
  padding-bottom: 40px
  background-color: #fff
  .container
    padding-top: 50px
  h2
    font-family: 'Spartan', sans-serif
    font-size: 36px
    line-height: 40px
    letter-spacing: -1px
    font-weight: 800
    color: #231F4D
    margin-bottom: 70px
    @media(max-width: 768px)
      margin-bottom: 40px
  .zm
    display: flex
    min-height: 360px
    @media(max-width: 1024px)
      gap: 60px
    @media(max-width: 768px)
      flex-wrap: wrap
      gap: 80px
    .infoc
      display: flex
      flex-direction: column
      justify-content: space-between
      margin-left 140px
      width calc((99.99% - 606px)/1)
    .busy-mentor
      display: flex
      padding-top: 2rem
      margin-bottom: 2rem
      .busy-message
        background: #FFFBE5
        color: #666
        display: flex
        flex-direction: row
        align-items: center
        .message
          font-size: 14px
          margin-left: 20px
          padding-top: 10px
          padding-right: 20px
          padding-bottom: 10px
          line-height: 1.4
          .highlighted
            color: #FFD400
            font-weight: 600
          span
            color: #6B798B
      .busy-icon
        display: flex
        background: #FFD400
        align-items: center
        justify-content: center
        padding: 1.2rem
    .name
      font-size: 28px
      font-weight: 500
      line-height: 34px
      color: #231F4D
      margin-bottom: 10px
    .text
      font-size: 14px
      line-height: 20px
      color: #6B798B
      margin-bottom: 20px
    .imgc
      align-self: flex-start
      position: relative
      width 466px
      @media(max-width: 768px)
        max-width: 400px
        margin-right: 20px
      >>> .img
        box-shadow: 0px 50px 50px rgba(0, 0, 0, 0.2)
        position: relative
        z-index: 5
        overflow: visible
      .tr
        position: absolute
        left: 0px
        top: 20px
        width: calc(100% + 40px)
        height: auto
        transform: rotate(180deg)
        @media(max-width: 1024px)
          width: calc(100% + 20px)
    .tax
      display: flex
      flex-wrap: wrap
      > div
        border-radius: 4px
        background-color: #F2F5F9
        padding: 6px 15px
        color: #6B798B
        font-size: 12px
        line-height: 12px
        margin-right: 3px
        margin-bottom: 3px
    .btnc
      margin-top: 40px
      margin-bottom: 0px
    .html
      margin-top: 40px
      margin-bottom: 40px
  .slot
    margin-top: 120px
    position: relative
    z-index: 2
    @media(max-width: 768px)
      margin-top: 60px
    h3
      text-align: center
      font-family: 'Spartan', sans-serif
      font-weight: 800
      line-height: 34px
      font-size: 28px
      letter-spacing: -1px
      color: #231F4D
      margin-bottom: 40px
      span
        font-size: 22px
        font-weight: 500
      &.lblue
        color: #58A2DC
        text-align: left
    .max
      max-width: 770px
      margin-bottom: 40px
    &.atsiliepimai-wrapper
      max-width: 800px
      margin: 0 auto
      margin-top: 120px
  .popupiinfo
    background-color: #fff
    width: 100%
    width: 560px
    min-height: 200px
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    @media(max-width: 600px)
      width: 100%
    .loginform
      max-width: 360px
      width: 100%
      margin: 0 auto
    .alert
      color: #6B798B
      font-size: 16px
      font-weight: 300
      line-height: 24px
      text-align: center
      a
        color: #5A98C8
        text-decoration: underline

.intro-enter-active
  .img
    transition: all 0.2s ease-in 0.4s
  .infoc
    transition: all 0.2s ease-in 0.4s
  .slot
    transition: all 0.2s ease-in 0.6s
  .tr
    >>> path[pid="0"]
      transition: all 0.2s ease-in 0.2s
    >>> path[pid="1"]
      transition: all 0.2s ease-in 0s
    >>> path[pid="2"]
      transition: all 0.2s ease-in 0.4s

.intro-enter
  .img
    transform: translateX(-10px)
    opacity: 0
  .infoc
    opacity: 0
    transform: translateY(-10px)
  .slot
    opacity: 0
    transform: translateY(-10px)
  .tr
    >>> path[pid="0"]
      opacity: 0
      transform: translateY(10px) translateX(0px)
    >>> path[pid="1"]
      opacity: 0
      transform: translateY(-10px)
    >>> path[pid="2"]
      opacity: 0
      transform: translateY(10px) translateX(-10px)
</style>
