<template lang="pug">
div.dropdown(v-bind:class="[color]" v-on-clickaway="close")
  div.click(v-on:click.prevent="toggle")
    slot
  transition(name="dropdown")
    div.menu(v-if="open" v-on:click="close")
      slot(name="menu")
</template>

<script>
import { directive as onClickaway } from 'vue3-click-away';

export default {

  name: 'DropDown',
  props: ['color'],
  components: {
  },
  created() {
  },
  directives: {
    onClickaway,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
  },
};
</script>

<style scoped lang="stylus">
.dropdown
  position relative
  &.white
    .menu
      color: #5A98C8;
      background-color: #dde9f6;
    >>>ul li a 
      border-bottom 1px  solid #72A7CF
  &.blue
    .menu
      color: #fff;
      background-color: #5A98C8;
  .click
    position relative
    z-index 5
    cursor pointer
  .menu
    z-index 6
    position absolute
    top 100%
    right 0px
    width 100%
    min-height 50px
    background-color #72A7CF
    transform-origin center top
    padding 20px
    min-width 160px
    >>>ul 
      li
        font-size 13px
        line-height 13px
        font-family: 'Spartan', sans-serif;
        font-weight 500
        margin-bottom 10px
        &:last-child
          margin-bottom 0px
          a 
            border-bottom 0
        a 
          border-bottom 1px  solid #72A7CF
          display block
          padding 10px 0px

.dropdown-enter-active, .dropdown-leave-active
  transition: all 0.3s;

.dropdown-enter, .dropdown-leave-to
  opacity: 0;
  transform: scaleY(0);

</style>
