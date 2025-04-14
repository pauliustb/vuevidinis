<template lang="pug">
transition(name="intro" appear v-bind:duration="{ enter: 1000, leave: 0 }" )
  div.twocols
    div(v-for="item in items" :style="{ backgroundImage: 'url(' + item.ico + ')','background-repeat': 'no-repeat', 'background-size': 'contain', 'background-position': 'bottom right' }")
      div.after(:style="{ backgroundImage: 'url(' + item.ico_deco + ')','background-repeat': 'no-repeat', 'background-size': 'contain', 'background-position': 'bottom right' }")
      div.content
        div
          // div.ico
            // img(v-bind:src="item.ico")
          div.title
           h3(v-html="item.title")
          div.text(v-if="item.text" v-html="item.text")
        div.btnc(v-if="item.link")
          UserBtn(v-bind:to="item.link" v-bind:href="item.link" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('gautiatsakyma')" textAligin="center")
</template>

<script>
import UserBtn from '@/components/elements/Btn.vue';

export default {
  name: 'TwoCols',
  props: ['items'],
  components: {
    UserBtn,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="stylus">
.twocols
  position relative
  overflow hidden
  display grid
  grid-template-columns: repeat(2, 1fr)
  gap 0px

  @media (max-width: 768px)
    display flex
    flex-wrap wrap

  > div
    overflow hidden
    position relative

    .after
      top 60px
      position absolute
      width 120px
      height 140px

    .content
      height 100%
      display flex
      flex-direction column
      justify-content space-between
      position relative
      padding 100px 20px
      max-width 440px
      margin 0 auto

      @media (max-width: 768px)
        padding-top 40px
        padding-bottom 40px

      .ico
        text-align center
        margin-bottom 30px

        img
          max-width 150px
          height auto

      .title
        h3
          font-size 28px
          line-height 34px
          color #FFFFFF
          font-family 'Spartan', sans-serif
          margin-bottom 30px
          font-weight 700
          text-transform uppercase

          >>> span
            color #FFD400

      .text
        font-size 14px
        line-height 22px
        color #fff
        font-weight 300

      .btnc
        margin-top 30px
        display flex

  > div:nth-child(even)
    background-color #2767B4
    

  > div:nth-child(odd)
    background-color #2E4E94
    

.intro-enter-active
  transition all 0.2s 0.8s ease-in

.intro-enter
  opacity 0
  transform translateY(10px)

@media(max-width 1200px)
  .twocols
    div
      width 100%
    
</style>
