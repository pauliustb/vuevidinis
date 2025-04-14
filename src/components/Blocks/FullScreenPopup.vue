<template lang="pug">
transition(name="fullscreen" appear v-bind:duration="400")
  div.full
    div.scroll
      div.slot
        div.centerslot(v-on-clickaway="close")
          a(href="#" v-on:click.prevent="close").close
            icon(:data="closeData" width="22" height="22" color="#000")
          slot
</template>

<script>
import { directive as onClickaway } from 'vue3-click-away';
import closeData from '@/assets/svg/close.svg'

export default {

  name: 'FullScreenPopup',
  components: {
  },
  created() {
  },
  directives: {
    onClickaway,
  },
  data() {
    return {
      closeData
    };
  },
  computed: {
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="stylus">
.full
  width 100%
  height 100%
  position fixed
  left 0px
  top 0px
  z-index 99999
  padding-top 20px
  padding-bottom 20px
  background-color rgba(4, 14, 48, 0.6)
  .scroll
    -webkit-overflow-scrolling: touch;  
    overflow: auto;
    width: 100%;
    height: 100%;
    display flex 
    justify-content center
    padding-top 0px
    padding-bottom 0px
    position relative
    z-index 5
    .slot 
      display: flex;
      justify-content: center;
      margin: auto;
      width: 100%;
      .centerslot
        background-color #fff
        padding 20px
        display: flex;
        justify-content: center;
        position relative
  .close
    position absolute
    right 20px
    top 20px
    z-index 10
    >>>svg 
      pointer-events: none;
    @media(max-width 768px)
      right 10px
      top 10px

.fullscreen-enter-active
  .full
    transition all 0.2s ease-in
  .scroll
    transition all 0.2s ease-in 0.2s
.fullscreen-leave-active
  .scroll
    transition all 0.2s ease-out
.fullscreen-enter, .fullscreen-leave-to 
  .full
    opacity 0
  .scroll
    transform translateY(-5px)
    opacity 0  
</style>
