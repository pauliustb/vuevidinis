<template lang="pug">
div.profile.menu-paddingtop
  UserLoader(color="dark" v-if="loader")
  div.neapsisprendes(v-if="this.$store.getters['user/user'].role === 'neapsisprendes' && loader === false" )
    UserLoader(color="dark" v-if="loaderneapsisprendes")
    div(v-else)
      TwoColsYellow(v-if="home.blocks2" v-bind:items="home.blocks2" v-on:select="selecttype")
  div.mentorius(v-if="this.$store.getters['user/user'].role === 'mentorius' && loader === false")
    div.container
      div.alert(v-if="this.$store.getters['user/user'].status === 'draft'") {{$t('user.msgwhendraft')}}
      MentoriusProfile
  div.user(v-if="this.$store.getters['user/user'].role === 'frontuser' && loader === false")
    div.container
      div.alert(v-if="this.$store.getters['user/user'].status === 'draft'") {{$t('user.msgwhendraft')}}
      UserProfile
</template>

<script>
import { mapGetters } from 'vuex';
import TwoColsYellow from '@/components/Blocks/Home/TwoColsYellow.vue';
import MentoriusProfile from '@/components/Forms/MentoriusProfile.vue';
import UserProfile from '@/components/Forms/UserProfile.vue';
import UserLoader from '@/components/elements/Loader.vue';

export default {

  name: 'MainProfile',
  components: {
    TwoColsYellow,
    MentoriusProfile,
    UserProfile,
    UserLoader
  },
  created() {
    this.$store.dispatch('user/getCurrent').then(() => {
      this.loader = false;
      if (this.$store.getters['user/user'].role === 'neapsisprendes') {
        this.$store.dispatch('Pages/getHome').then(() => {
          this.loaderneapsisprendes = false;
        });
      }
    });
  },
  data() {
    return {
      loaderneapsisprendes: true,
      loader: true,
    };
  },
  computed: {
    ...mapGetters('Pages', {
      home: 'home',
    }),
    ...mapGetters('User', {
      user: 'user',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logOut');
    },
    selecttype(val) {
      this.loader = true;
      this.$store.dispatch('user/selectUserType', val).then(() => {
        this.loader = false;
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.profile
  .container
    padding-top 40px
    padding-bottom 40px
  .alert
    background-color #dc4e41
    padding 5px 10px
    color #fff
    margin-bottom 30px
.neapsisprendes
  >>>.cols
    min-height calc(100vh - 100px)
    @media(max-width 1200px)
      min-height calc(100vh - 60px)
    .content
      justify-content: center;
</style>
