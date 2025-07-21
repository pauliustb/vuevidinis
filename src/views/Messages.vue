<template lang="pug">
  div.page.menu-paddingtop
    UserLoader(color="dark" v-if="loadingIntro")
    div(v-else)
      TopPage(:title="data.title" :text="data.text" :img="null" :lefto="false" :righto="'blue'")
        div.container
          div.listcontainer
            UserLoader(color="dark" v-if="loading")

            div(v-else)
              div.list(v-if="list && list.length > 0")
                div.item(v-for="item in list" :key="item.id")
                  .maininfo
                    div.conversationinfo
                      h3(:class="{ 'unread': !item.is_read }") {{ item.convo_title }}
                      p(:class="{ 'unread': !item.is_read }") {{ item.author_name }}
                      p(:class="{ 'unread': !item.is_read }") {{ item.mentor_name }}
                      p(:class="{ 'unread': !item.is_read }") {{ item.created_at }}
                    div.conversationbutton
                      UserBtn(v-on:mousedown="openConversation(item.id)" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:uppercase="false" v-bind:text="$t('view')" textAligin="center")
              div(v-else) {{$t('nomessages')}}

</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UserMessages',
  components: {
    TopPage,
    UserLoader,
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
      this.$store.dispatch('messages/get');
    }
  },
  data() {
    return {
      loadingIntro: true,
    };
  },
  computed: {
    ...mapGetters('Pages', { data: 'default' }),
    ...mapGetters('user', { user: 'user' }),
    list() {
      return this.$store.getters['messages/list'];
    },
    loading() {
      return this.$store.getters['messages/loading'];
    },
    page() {
      return this.$store.getters['messages/page'];
    },
  },
  methods: {
    openConversation(convoId) {
      this.router.push({ name: 'UserConversation', params: { id: convoId } });
    }
  },
  watch: {
    '$route.meta.id': {
      handler() {
        this.loadingIntro = true;
        this.$store.dispatch('Pages/getDefault', this.$route.meta.id).then(() => {
          this.loadingIntro = false;
        });
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.page
  padding-bottom 40px

.list
  width 95%
  .item
    padding 10px 0
    border-bottom 1px solid #DDE9F6

    .maininfo
      font-size 14px
      color #231F4D
      display flex
      justify-content space-between
      align-items center

      .conversationinfo
        display flex
        width 100%
        gap: 20px

        > *
          flex: 0 0 25%;
          box-sizing: border-box;


.unread
  font-weight 600

@media (max-width: 768px)
  .item
    padding 10px !important
    background-color #ffffff
    border 1px solid #DDE9F6

  .conversationinfo
    gap 10px !important
    flex-direction column

  .list
    width 100%
    display flex
    flex-direction column
    gap: 10px


</style>
