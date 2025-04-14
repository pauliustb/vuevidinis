<template lang="pug">
div.itemstory
  router-link(v-bind:to="link")
    div.imgc
      LazyImg(v-if="img" v-bind:image="img" v-bind:cover="true").img
    div.info
      div.top
        div.title {{title}}
        div.text(v-if="text" v-html="text")
      div.link {{$t('more2')}}
</template>

<script>
import LazyImg from '@/components/elements/LazyImg.vue'

export default {

  name: 'StorieListItem',
  props: ['title', 'text', 'link', 'img'],
  components: {
    LazyImg
  },
  created() {
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
.itemstory
  width 30%
  a 
    background-color #fff
    box-shadow: 0px 3px 50px rgba(90, 152, 200, 0.1);
    display: flex;
    height: 100%;
    flex-direction: column;
    transition 0.4s  all
    position relative
    overflow hidden
    &:after
      content ''
      position absolute
      bottom 0px
      left 0px
      width 100%
      height 3px
      background-color #5A98C8
      transform scaleX(0) scaleY(1) translateY(3px)
      transform-origin center
      transition transform  0.35s ease-in-out;
    &:hover,&:focus
      box-shadow: 0px 30px 20px rgba(0, 50, 125, 0.2);
      &:after
        transform scaleX(1.2) scaleY(1)
  .imgc
    width 100%
    height 360px
    @media(max-width 768px)
      height auto
  .info
    padding-left 30px
    padding-right 30px
    padding-top 48px
    padding-bottom 44px
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height 100%
    @media(max-width 1024px)
      padding 30px 20px
    .title
      font-family: 'Spartan', sans-serif;
      font-size 16px
      line-height 22px
      font-weight 700
      margin-bottom 15px
      color #231F4D
    .text 
      font-size 14px 
      line-height 22px
      font-weight 300
      color #6B798B
      margin-bottom 15px
    .link 
      color #246CB5
      font-size 14px
      line-height 14px
      font-family: 'Spartan', sans-serif;
      font-weight 600
</style>
