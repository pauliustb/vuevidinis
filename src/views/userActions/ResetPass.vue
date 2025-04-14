<template lang="pug">
div.menu-paddingtop
  div.container(v-if="$route.query.email && $route.query.key")
    div.cont
      LostPasswordRestForm(v-bind:email="$route.query.email" v-bind:resetkey="$route.query.key")
</template>

<script>
import LostPasswordRestForm from '@/components/Forms/LostPasswordRestForm.vue';

export default {

  name: 'ResetPass',
  components: {
    LostPasswordRestForm,
  },
  created() {
    this.$store.dispatch('user/logOut');
  },
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.container
  padding-top 40px
  .cont
    width 100%
    margin 0  auto
    max-width 360px
</style>
