<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(v-bind:title="data.title" v-bind:text="data.text" v-bind:img="null" v-bind:lefto="'triangle_ornament_yellow'" v-bind:righto="'triangle_ornament'")
      div.container 
        div.max
          MentoriaiFilter(store="MentoriaiStatic")
        MentoriaiList(store="MentoriaiStatic")
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import MentoriaiFilter from '@/components/Blocks/MentoriaiFilter.vue';
import MentoriaiList from '@/components/Blocks/MentoriaiList.vue';
import UserLoader from '@/components/elements/Loader.vue';

export default {

  name: 'MentoriaiStatic',
  components: {
    TopPage,
    MentoriaiFilter,
    MentoriaiList,
    UserLoader
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
    width 250px
    @media(max-width 1024px)
      display none
  >>>.tr2
    @media(max-width 1200px)
      display none
  .max
    max-width 770px
    margin-bottom 40px
</style>
