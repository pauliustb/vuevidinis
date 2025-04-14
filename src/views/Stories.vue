<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(:title="data.title" :text="data.text" :img="null" :lefto="false" :righto="'blue'")
      div.container 
        UserLoader(color="dark" v-if="loadingStories")
        div(v-else)
          div.list
            StorieListItem(v-for="item in list" v-bind="item" v-bind:key="item.id")
          div.more(v-if="list.length < total")
            UserBtn(v-bind:href="'#'" v-on:click="loadmore" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('morestories')" textAligin="center")
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import StorieListItem from '@/components/Blocks/StorieListItem.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';

export default {

  name: 'UserStories',
  components: {
    TopPage,
    StorieListItem,
    UserLoader,
    UserBtn
  },
  created() {
  },
  data() {
    return {
      loading: true,
      loadingStories: true,
      loadingBtn: false,
    };
  },
  computed: {
    ...mapGetters('Pages', {
      data: 'default',
    }),
    ...mapGetters('Stories', {
      list: 'list',
      page: 'page',
      total: 'total',
    }),
  },
  methods: {
    loadmore() {
      this.loadingBtn = true;
      this.$store.dispatch('Stories/get').then(() => {
        this.loadingBtn = false;
      });
    },
  },
  watch: { 
    '$route.meta.id': {
      handler() {
        this.loading = true;
        this.$store.dispatch('Pages/getDefault', this.$route.meta.id).then(() => {
          this.loading = false;
        });     
        if (this.page === 0) {
          this.$store.dispatch('Stories/get').then(() => {
            this.loadingStories = false;
          });
        } else {
          this.loadingStories = false;
        }
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
  background-color: #F6F9FC
  .list
    display: flex
    flex-wrap: wrap
    gap: 44px 
    margin-bottom: 60px
    @media(max-width: 1024px)
      gap: 20px 
      margin-bottom: 40px
    @media(max-width: 768px)
      gap: 20px 
      width: 100%
  .more
    display: flex
    justify-content: center
    margin-bottom: 20px

</style>
