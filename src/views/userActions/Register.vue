<template lang="pug">
div.home.menu-paddingtop
  UserLoader(color="dark" v-if="loader")
  div(v-else)
    TwoColsYellow(v-if="home.blocks2" v-bind:items="home.blocks2")
</template>

<script>
import { mapGetters } from 'vuex';
import TwoColsYellow from '@/components/Blocks/Home/TwoColsYellow.vue';
import UserLoader from '@/components/elements/Loader.vue';

export default {

  name: 'UserRegister',
  components: {
    TwoColsYellow,
    UserLoader
  },
  created() {
    this.$store.dispatch('Pages/getHome').then(() => {
      this.loader = false;
    });
  },
  data() {
    return {
      loader: true,
    };
  },
  computed: {
    ...mapGetters('Pages', {
      home: 'home',
    }),
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.home
  >>>.cols
    min-height calc(100vh - 100px)
    @media(max-width 1200px)
      min-height calc(100vh - 60px)
    .content
      justify-content: center;
</style>
