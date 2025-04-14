<template lang="pug">
div(v-if="items && items.length > 0")
  PhotoSwipe(v-bind:isOpen="open" v-bind:items="items" v-bind:options="{index:index, history: false}" v-on:close="hidePhotoSwipe")
</template>

<script>
import { PhotoSwipe } from '@/components/photoswipe';
// import { mapGetters } from 'vuex';

export default {

  name: 'PhotoSwipeContainer',
  components: {
    PhotoSwipe,
  },
  created() {
  },
  data() {
    // return {
    //   options: {
    //     index: 0,
    //   },
    // };
    return {
      open: false,
      index: 0,
      items: [],
    };
  },
  computed: {
    // ...mapGetters('PhotoSwipe', {
    //   open: 'open',
    //   index: 'index',
    //   items: 'items',
    // }),
  },
  methods: {
    hidePhotoSwipe() {
      // this.$store.dispatch('PhotoSwipe/set', false);
      this.open = false;
    },
  },
};
</script>

<style scoped lang="stylus">

</style>
