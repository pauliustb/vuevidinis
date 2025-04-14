<template lang="pug">
div.home.menu-paddingtop
  UserLoader(color="dark" v-if="loader")
  div(v-else)
    UserIntro(v-if="home.intro" v-bind="home.intro").intro
    TwoCols(v-bind:items="home.twocols").twocols
    EventsCarusel(v-if="home.events" v-bind:items="home.events")
    IcoBlocks(v-if="home.blocks" v-bind:items="home.blocks")
    TwoColsOld(v-if="home.twocolsold" v-bind:items="home.twocolsold").twocols
    UsersSlider(v-if="home.mentoriai" v-bind:items="home.mentoriai" :menotoriuLink="home.mentoriu_puslapis")
    TwoColsYellow(v-if="home.blocks2" v-bind:items="home.blocks2")
    UserStories(v-if="home.istorijos" v-bind="home.istorijos")
</template>

<script>
import { mapGetters } from 'vuex';
import UserIntro from '@/components/Blocks/Home/Intro.vue';
import TwoCols from '@/components/Blocks/Home/TwoCols.vue';
import TwoColsOld from '@/components/Blocks/Home/TwoColsOld.vue';
import EventsCarusel from '@/components/Blocks/Home/EventsCarusel.vue';
import IcoBlocks from '@/components/Blocks/Home/IcoBlocks.vue';
import UsersSlider from '@/components/Blocks/Home/UsersSlider.vue';
import TwoColsYellow from '@/components/Blocks/Home/TwoColsYellow.vue';
import UserStories from '@/components/Blocks/Home/Stories.vue';
import UserLoader from '@/components/elements/Loader.vue';

export default {

  name: 'UserHome',
  components: {
    UserIntro,
    TwoCols,
    EventsCarusel,
    IcoBlocks,
    UsersSlider,
    TwoColsYellow,
    UserStories,
    TwoColsOld,
    UserLoader,
  },
  created() {
  this.$store.dispatch('Pages/getHome').catch((error) => {
    console.error('Error during home data fetch:', error);
  });
},
  mounted() {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('Pages', ['home']),
  loader() {
    return Object.keys(this.home).length === 0;
  },
    homeData() {
    return this.home;
  },
  },
  methods: {
    // logout() {
    //   this.$store.dispatch('User/logOut');
    // },
  },
  beforeUnmount() {
  },
  // beforeDestroy() {
  // },
};
</script>

<style scoped lang="stylus">
.home
  width 100%
</style>
