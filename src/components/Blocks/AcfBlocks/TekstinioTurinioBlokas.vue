<template lang="pug">
  div.block
    UserWyswyg(v-bind:html="data.turinys")
</template>

<script>
import UserWyswyg from '@/components/elements/Wyswyg.vue';

export default {
  name: 'TekstinioTurinioBlokas',
  components: {
    UserWyswyg,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
