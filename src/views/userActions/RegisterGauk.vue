<template lang="pug">
div.home.menu-paddingtop
  div.container 
    div.cont
      h1 {{$t('registerpage.gauk')}}
      RegisterForm(v-bind:type="1")
</template>

<script>
import RegisterForm from '@/components/Forms/RegisterForm.vue';

export default {

  name: 'RegisterGauk',
  components: {
    RegisterForm,
  },
  created() {
  },
  data() {
    return {
      loader: true,
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.home
  .container 
    padding-top 40px
    padding-bottom 40px
    .cont
      width 100%
      margin 0  auto
      max-width 360px
    h1 
      text-align center
      font-family: 'Spartan', sans-serif;
      font-size 24px
      line-height 24px
      color #231F4D
      font-weight 800
      margin-bottom 40px
</style>
