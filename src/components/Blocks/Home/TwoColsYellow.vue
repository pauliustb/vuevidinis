<template lang="pug">
div.cols
  div(v-for="item in items")
    LazyImg(v-bind:image="item.img" v-bind:cover="true").back.img
    div.over
    div.after(:style="{ backgroundImage: 'url(' + item.img_deco + ')','background-repeat': 'no-repeat', 'background-size': 'contain', 'background-position': 'bottom left' }")
    div.content
      div.top
        div.title
          h3(v-html="item.title")
        // div.text(v-if="item.text" v-html="item.text")
      div.btnc
      UserBtn(v-on:click="select(item.type)" v-if="$user && $user.get && $user.get().role === 'neapsisprendes' && $route.name === 'Profile'" v-bind:href="item.link" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('select')" textAligin="center")
      UserBtn(v-else v-bind:to="item.link" v-bind:href="item.link" v-bind:active="false" color="yellow" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('register')" textAligin="center")
</template>

<script>
import UserBtn from '@/components/elements/Btn.vue';
import LazyImg from '@/components/elements/LazyImg.vue';

export default {

  name: 'TwoColsYellow',
  props: ['items'],
  components: {
    UserBtn,
    LazyImg,
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
    select(value) {
      this.$emit('select', value);
    },
  },
};
</script>

<style scoped lang="stylus">
.cols
  display flex
  flex-wrap wrap

  > div
    width 50% 
    padding 0px 
    
  @media (max-width: 700px)
    > div
      width 100% 
      padding 0px

  >>> img
    object-position: 50% 0%

  > div
    overflow hidden
    position relative
    min-height 480px

    @media (max-width: 700px)
      min-height auto

    > a
      position absolute
      left 0px
      top 0px
      width 100%
      height 100%  
      z-index 3

    .over
      position absolute
      left 0px
      top 0px
      width 100%
      height 100%  
      background-color #25408F
      opacity 0.2

    .after
      bottom 150px
      position absolute
      width 180px
      height 200px

    .back
      position absolute
      left 0
      top 0
      width 100%
      height 100%

    .content
      position relative
      z-index 2
      padding 100px 20px
      max-width 310px
      margin 0 auto 
      
      @media (max-width: 700px)
        padding 60px 20px

      display flex
      flex-direction column
      justify-content flex-end
      height 100%

      .title
        h3
          text-transform uppercase
          font-family 'Spartan', sans-serif
          font-size 36px
          line-height 42px
          font-weight 700
          color #fff
          margin-bottom 30px
          width 100%

          >>> span
            color #FFD400

      .btnc
        display flex

</style>
