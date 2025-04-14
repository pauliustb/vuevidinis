<template lang="pug">
div.selectel(v-bind:class="{error:error}")
  div.loading(v-if="loading")
    UserLoader(color="dark")
  div.over(:class="{small : small}")
    div
      icon(v-bind:data="icoarray[ico]" color="#5A98C8" width="20" height="20")
    div
      span(v-if="!val") {{placeholder}}
      span(v-else) {{val.name}}
    div.after
      icon(:data="arrowData" width="12" height="6" color="#5A98C8")
  select(v-model="val" v-bind:placeholder="placeholder" v-on:change="updateValue()")
    option(v-bind:value="''") ---
    option(v-for="item in items" v-bind:value="item") {{item.name}}

</template>
<script>
import location from '@/assets/svg/location.svg';
import calendar from '@/assets/svg/calendar.svg';
import UserLoader from '@/components/elements/Loader.vue';
import arrowData from '@/assets/svg/arrow.svg';

export default {

  name: 'SelectEl',
  props: ['items', 'value', 'placeholder', 'error', 'loading', 'ico', 'small'],
  components: {
    UserLoader
  },
  mounted() {

  },
  data() {
    return {
      arrowData,
      icoarray: {
        location,
        calendar,
      },
      val: '',
    };
  },
  computed: {
  },
  methods: {
    updateValue() {
      this.$emit('update:modelValue', this.val);
    },
  },
  beforeUnmount() {
  }
  // beforeDestroy() {
  // }
  ,
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal || newVal === '') {
          this.val = newVal;
        }
      },
    },
  },
};
</script>

<style scoped lang="stylus">
.selectel
  position: relative
  height: 48px
  width: 100%

  .over
    align-items: center
    font-weight: 700
    font-family: 'Spartan', sans-serif
    font-size: 18px
    line-height: 18px
    position: absolute
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    background-color: #fff
    color: #6B798B
    pointer-events: none
    display: flex
    gap: 15px
    border-bottom: 1px solid #CFD5E1
    &.small
      color: #6B798B
      font-size: 14px
      font-weight: 600
      line-height: 14px

  .after
    

  &.error
    select
      border-color: #fc6076

  .loading
    position: absolute
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  select
    transition: 0.3s all
    padding: 8px 20px
    width: 100%
    height: 48px
    border-radius: 0px
    display: flex
    align-items: center
    color: #6B798B
    border-bottom: 1px solid #CFD5E1
    background-color: #ffffff
    font-size: 16px
    line-height: 22px
    font-weight: 300
    padding-right: 40px
    &::-ms-expand
      display: none
    &:focus
      border-bottom: 1px solid #5A98C8


</style>
