<template lang="pug">
div.rez
  div
    div
      div.ico 
        icon(:data="rez1Data" v-bind:original="true" width="88" height="80")
      div.title {{$t('rez.rez1')}}
    div.sk
      UserLoader(color="dark" v-if="loader")
      span(v-else) {{results.sus_cat}}
  div
    div
      div.ico 
        icon(:data="rez2Data" v-bind:original="true" width="88" height="80")
      div.title {{$t('rez.rez2')}}
    div.sk 
      UserLoader(color="dark" v-if="loader")
      span(v-else) {{results.sus_men}}
  div
    div
      div.ico 
        icon(:data="rez3Data" v-bind:original="true" width="88" height="80")
      div.title {{$t('rez.rez3')}}
    div.sk
      UserLoader(color="dark" v-if="loader")
      span(v-else) {{results.aktyvumas}}
</template>

<script>
import { mapGetters } from 'vuex';
import UserLoader from '@/components/elements/Loader.vue';
import rez1Data from '@/assets/svg/rez1.svg'
import rez2Data from '@/assets/svg/rez2.svg'
import rez3Data from '@/assets/svg/rez3.svg'

export default {

  name: 'ResultsInfo',
  components: {
    UserLoader
  },
  created() {
    this.$store.dispatch('user/getResults').then(() => {
      this.loader = false;
    });
  },
  data() {
    return {
      rez1Data,
      rez2Data,
      rez3Data,
      loader: true,
    };
  },
  computed: {
    ...mapGetters('user', {
      results: 'results',
    }),
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.rez
  width 100%
  display flex
  flex-wrap wrap
  justify-content space-between
  gap 40px

  >div
    display flex
    flex-direction column
    justify-content space-between

  @media(max-width 1024px)
    flex-wrap wrap
    gap 40px

.ico
  display flex
  justify-content center
  margin-bottom 30px
  
  @media(max-width 1024px)
    margin-bottom 15px

.title
  max-width 200px
  margin 0 auto
  width 100%
  text-align center
  font-size 14px
  line-height 22px
  text-transform uppercase
  font-family 'Spartan', sans-serif
  font-weight 800
  margin-bottom 5px
  color #231F4D

.sk
  display flex
  justify-content center
  align-items center
  word-break break-word
  min-height 50px
  text-align center
  font-size 28px
  line-height 34px
  color #231F4D
  font-family 'Spartan', sans-serif
  font-weight 800

</style>
