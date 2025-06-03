<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loadingIntro")
  div(v-else)
    TopPage(v-bind:title="data.title" v-bind:text="data.text" v-bind:img="null" v-bind:lefto="false" v-bind:righto="'blue'")
      div.container
        div.search
          UserInput(v-bind:placeholder="$t('rzodis')" v-on:input="setKeyword" v-model="settedKeyword" type="input"
            v-on:click="submit"
            v-bind:error="false" v-bind:disabled="false")
        div.listcontainer
          UserLoader(color="dark" v-if="loading")
          div(v-else)
            div.list(v-if="list && list.length > 0")
              div.top.split
                div
                  div {{$t('filter.data')}}
                div
                  span(v-if="$user.user.role === 'mentorius'") {{$t('messageauthor')}}
                  span(v-else) {{$t('messagegavejas')}}
                div {{$t('messagesubject')}}
                div
              div.mid
                div.item(v-for="item in list" v-bind:class="{strong:item.open===false, open:openedItems.find(e=>e===item.id)}" )
                  div.maininfo.split
                    div.emailme
                      a(style="  text-align: center;  display: flex;  flex-direction: column;  align-items: center;" v-bind:title="item.email" v-bind:href="'mailto:'+item.email")
                        icon(:data="messagesData" color="#5A98C8" width="20" height="15")
                        span(style="font-size:10px") {{$t('atsakyti')}}
                    div
                      span.mobile {{$t('filter.data')}}: <br>
                      span {{item.date}}
                    div
                      span(v-if="$user.user.role === 'mentorius'").mobile {{$t('messageauthor')}}: <br>
                      span(v-else).mobile {{$t('messagegavejas')}}:
                      span {{item.name}}
                    div {{item.title}}
                    div
                      div.click(v-on:click="open(item)")
                      icon(:data="arrowData" width="12" height="6" color="#5A98C8").arrow
                  div.content.split
                    div
                    div
                    div
                    div
                      div.msg
                        UserWyswyg(v-bind:html="item.text")
                    div
              div.more(v-if="list.length < total")
                UserBtn(v-bind:href="'#'" v-on:click="loadmore" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('more')" textAligin="center")
            div(v-else) {{$t('nomessages')}}
</template>

<script>
import { mapGetters } from 'vuex';
import {debounce} from 'throttle-debounce';
import TopPage from '@/components/Blocks/TopPage.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserInput from '@/components/elements/Userinput.vue';
import messagesData from '@/assets/svg/messages.svg';
import arrowData from '@/assets/svg/arrow.svg';
import { useRouter } from 'vue-router';


export default {

  name: 'UserMessages',
  components: {
    TopPage,
    UserWyswyg,
    UserLoader,
    UserInput,
    UserBtn
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  created() {
    if (this.user.role === 'guest') {
      this.router.push({ name: "Home" });
      return;
    }

    if (this.page === 0) {
      this.$store.dispatch('messages/get').then(() => {
      });
    }
  },
  data() {
    return {
      messagesData,
      arrowData,
      loadingIntro: true,
      loadingBtn: false,
      openedItems: [],
      settedKeyword: '',
    };
  },
  computed: {
    ...mapGetters('Pages', {
      data: 'default',
    }),
    ...mapGetters("user", {
      user: "user",
    }),
    keyword: {
      get() {
        return this.activeKeyword;
      },
      set() {

      },
    },
    activeKeyword() {
      return this.$store.getters['messages/keyword'];
    },
    list() {
      return this.$store.getters['messages/list'];
    },
    total() {
      return this.$store.getters['messages/total'];
    },
    loading() {
      return this.$store.getters['messages/loading'];
    },
    page() {
      return this.$store.getters['messages/page'];
    },
  },
  methods: {
    submit() {

    },
    setKeyword: debounce(300, function (_) { // eslint-disable-line
      this.$store.dispatch('messages/setKeyword', this.settedKeyword);
    }),
    loadmore() {
      this.loadingBtn = true;
      this.$store.dispatch('messages/get').then(() => {
        this.loadingBtn = false;
      });
    },
    open(item) {
      const index = this.openedItems.findIndex((e) => e === item.id);
      if (index === -1) {
        if (item.open === false) {
          this.$store.dispatch('messages/open', item.id).then(() => {
            this.$store.dispatch('messages/getUnreadMessagesCount');
          });
        }
        this.openedItems.push(item.id);
      } else {
        this.openedItems.splice(index, 1);
      }
    },
  },
  watch: {
    '$route.meta.id': {
      handler() {
        this.loadingIntro = true;
        this.$store.dispatch('Pages/getDefault', this.$route.meta.id).then(() => {
          this.loadingIntro = false;
        });
        // this.$store.dispatch('Events/get').then(() => {
        //   this.loadingStories = false;
        // });
      },
      deep: false,
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.page
  padding-bottom: 40px

  .mobile
    display: none
    @media(max-width: 1024px)
      display: inline

  .tr
    width: 250px
    @media(max-width: 1024px)
      display: none

  .search
    max-width: 770px
    margin-bottom: 40px

  .list
    .top
      align-items: center
      height: 30px
      color: #B0C5DC
      font-size: 12px
      line-height: 16px
      font-weight: 500
      font-family: 'Spartan', sans-serif
      border-bottom: 2px solid #DDE9F6
      @media(max-width: 768px)
        display: none !important

    .split
      display: flex
      flex-wrap: wrap
      gap: 20px 
      @media(max-width: 1024px)
        gap: 20px  
      @media(max-width: 768px)
        gap: 10px 

    .more
      display: flex
      justify-content: center
      margin-top: 20px

    .mid
      .item
        overflow: hidden
        border-bottom: 1px solid #DDE9F6
        @media(max-width: 768px)
          padding: 10px 0px
          
        .emailme
          display: flex
          justify-content: center

        .arrow
          transition: 0.2s all

        .content
          overflow: hidden
          max-height: 0
          transition: 0.2s all
          @media(max-width: 1024px)
            flex-wrap: wrap
            gap: 0px  
          
          .msg
            padding-top: 5px
            padding-bottom: 5px

        .maininfo
          cursor: pointer
          position: relative
          align-items: center
          min-height: 70px
          font-size: 14px
          line-height: 20px
          color: #231F4D
          @media(max-width: 1024px)
            align-items: flex-start

        .click
          position: absolute
          left: 70px
          top: 0
          width: calc(100% - 70px)
          height: 100%
          z-index: 2

        &.strong
          font-weight: 600

        &.open
          .content
            max-height: 5000px
          .arrow
            transform: rotate(180deg)

</style>
