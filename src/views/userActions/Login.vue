<template lang="pug">
div.menu-paddingtop
  div.container
    div.loginf
      h1 {{$t('login')}}
      LoginForm
</template>

<script>
import LoginForm from '@/components/Forms/LoginForm.vue';

export default {

  name: 'UserLogin',
  components: {
    LoginForm,
  },
  created() {
  },
  mounted() {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {

  },
  beforeUnmount() {
  },
};
</script>

<style scoped lang="stylus">
.container
  padding-top 40px
  padding-bottom 40px
  .loginf
    max-width 360px
    width 100%
    margin 0 auto
    h1 
      text-align center
      font-family: 'Spartan', sans-serif;
      font-size 24px
      line-height 24px
      color #231F4D
      font-weight 800
      margin-bottom 40px
</style>
