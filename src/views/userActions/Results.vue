<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(v-bind:title="data.title" v-bind:text="data.intro" v-bind:img="null" v-bind:lefto="false" v-bind:righto="'blue'")
      div.container 
        div.rezinfo
          ResultsInfo
          UserWyswyg(v-bind:html="data.text")
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import ResultsInfo from '@/components/Blocks/ResultsInfo.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';

export default {

  name: 'UserResults',
  components: {
    TopPage,
    ResultsInfo,
    UserLoader,
    UserWyswyg
  },
  created() {
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters('Pages', {
      data: 'default',
    }),
  },
  methods: {
  },
  watch: { 
    '$route.meta.id': {
      handler() {
        this.loading = true;
        this.$store.dispatch('Pages/getDefault', this.$route.meta.id).then(() => {
          this.loading = false;
        });     
      },
      deep: false,
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.page
  padding-bottom 40px
  background-color #fff
  >>>.tr 
    width: 250px;
    @media(max-width 1300px)
      display none
  .container
    
    margin-bottom: 60px;
  .rezinfo
    margin-bottom 60px
</style>
