<template lang="pug">
router-link(v-if="to" v-bind:to="to" v-bind:class="[size, color]").round
  slot
a.round(v-else v-bind:href="href" v-bind:class="[size, color]")
  slot
</template>

<script>
export default {

  name: 'RuondIco',
  components: {
  },
  props: ['size', 'href', 'to', 'color'],
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
};
</script>

<style scoped lang="stylus">
.round
  user-select none
  cursor pointer
  outline none
  display flex 
  justify-content center
  align-items center
  width: 50px;
  height: 50px;
  border-radius 50%
  background-color: #fff;
  &.white
    background-color: #fff;
  >>>svg
    transition 0.3s all
  &.min
    width: 40px;
    height: 40px;
    >>>svg 
      width 20px !important
      height auto !important
  &.mid 
    width: 50px;
    height: 50px;
  &.max
    width: 60px;
    height: 60px;
    >>>svg 
      width 40px !important
      height auto !important
</style> 
