<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(v-bind:title="single && single.title" v-bind:text="single && single.text" v-bind:img="single && single.img" v-bind:lefto="false" v-bind:righto="true")
      div.container
        UserWyswyg(v-if="single && single.text_full" v-bind:html="single.text_full")
      UserStories(v-if="single && single.istorijos" v-bind="single.istorijos" v-bind:title="$t('successstories')")
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import UserStories from '@/components/Blocks/Home/Stories.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';

export default {

  name: 'SingleStory',
  components: {
    TopPage,
    UserStories,
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
    ...mapGetters('Stories', {
      single: 'single',
    }),
  },
  methods: {

  },
  watch: { 
    '$route.params.slug': {
    async handler() {
      this.loading = true;
      try {
        await this.$store.dispatch('Stories/getSingle', this.$route.params.slug);
        if (this.single) {
          this.loading = false;
        } else {
          console.error('Single story data not found!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.loading = false;
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
  padding-bottom 0px
  background-color #fff
  .container
    max-width 800px
    margin-bottom 60px
</style>
