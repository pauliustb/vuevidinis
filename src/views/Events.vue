<template lang="pug">
  div.page.menu-paddingtop
    UserLoader(color="dark" v-if="loading")
    div(v-else-if="data") 
      TopPage(:title="data.title" :text="data.text" :img="null" :lefto="false" :righto="'blue'")
        div.container 
          EventsFilter
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import TopPage from '@/components/Blocks/TopPage.vue';
  import EventsFilter from '@/components/Blocks/EventsFilter.vue';
  import UserLoader from '@/components/elements/Loader.vue';
  
  export default {
    name: 'UserEvents',
    components: {
    TopPage,
    EventsFilter,
    UserLoader,
  },
  created() {
  },
  data() {
    return {
      loading: true,
      loadingStories: true,
      city: '',
      period: '',
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
        this.$store.dispatch('Events/get').then(() => {
          this.loadingStories = false;
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
  >>>.tr
    width: 250px;
    @media(max-width 1024px)
      display none
</style>
