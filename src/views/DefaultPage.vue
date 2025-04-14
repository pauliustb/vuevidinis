<template lang="pug">
  div.page.menu-paddingtop
    UserLoader(color="dark" v-if="loading")
    div(v-else)
      //- TopPage(v-bind:title="data.title" v-bind:text="data.intro" v-bind:img="data.img || null" v-bind:lefto="false" v-bind:righto="true")
      TopPage(v-bind:title="data.title" v-bind:text="data.intro" v-bind:img="null" v-bind:lefto="false" v-bind:righto="true")
      div.container
        UserWyswyg(v-bind:html="data.text")
        AcfBlocks(:blocks="data.acf_blocks || []")
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import AcfBlocks from '@/components/Blocks/AcfBlocks.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';
import UserLoader from '@/components/elements/Loader.vue';

export default {
  name: 'DefaultPage',
  components: {
    TopPage,
    AcfBlocks,
    UserWyswyg,
    UserLoader
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
  created() {
  this.loadPageData();
  },
  methods: {
    loadPageData() {
    const pageId = this.$route.meta.id;
    if (!pageId) {
      console.warn(`No page ID available in route meta for ${this.$route.path}`);
      return;
    }

    this.loading = true;

    this.$store.dispatch('Pages/getDefault', pageId)
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.error(`Error fetching data for ${this.$route.path}:`, err);
      });
  },
  },
  '$route.meta.id': {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadPageData();
        }
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
    max-width: 800px;
    margin-bottom: 60px;
</style>