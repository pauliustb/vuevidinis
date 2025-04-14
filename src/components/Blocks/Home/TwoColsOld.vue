<template lang="pug">
transition(name="intro" appear v-bind:duration="{ enter: 1000, leave: 0 }" )
  div.twocols
    div(v-for="item in items")
      div.after
      div.content
        div
          div.ico
            img(v-bind:src="item.ico")
          div.title {{item.title}}
          div.text(v-if="item.text" v-html="item.text")
        div.btnc(v-if="item.link")
          UserBtn(v-bind:to="item.link" v-bind:href="item.link" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('more')" textAligin="center")
</template>

<script>
import UserBtn from '@/components/elements/Btn.vue';

export default {

  name: 'TwoColsOld',
  props: ['items'],
  components: {
    UserBtn,
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
.twocols
  position: relative
  overflow: hidden
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  gap: 0px

  @media (max-width: 768px)
    flex-wrap: wrap
    justify-content: center
    gap: 0px

  > div
    overflow: hidden
    position: relative

    .after
      left: 0px
      top: 0px
      content: ''
      position: absolute
      width: 100%
      padding-top: 200%

    .content
      height: 100%
      display: flex
      flex-direction: column
      justify-content: space-between
      position: relative
      padding: 80px 20px
      max-width: 440px
      margin: 0 auto

      @media (max-width: 768px)
        padding-top: 40px
        padding-bottom: 40px

      .ico
        text-align: center
        margin-bottom: 30px
        img
          max-width: 150px
          height: auto

      .title
        text-align: center
        font-size: 28px
        line-height: 34px
        color: #FFFFFF
        font-family: 'Spartan', sans-serif
        margin-bottom: 30px
        font-weight: 700

      .text
        text-align: center
        font-size: 14px
        line-height: 22px
        color: #fff
        font-weight: 300

      .btnc
        margin-top: 30px
        display: flex
        justify-content: center

  > div:nth-child(even)
    background-color: #203981
    width 50%

    .after
      background-color: #25408F
      transform: rotate(-55deg)
      transform-origin: 0% 0%

  > div:nth-child(odd)
    background-color: #052D68
    width 50%
    

    .after
      background-color: #02265B
      transform: rotate(55deg)
      transform-origin: 100% 0%

.intro-enter-active
  transition: all 0.2s 0.8s ease-in

.intro-enter
  opacity: 0
  transform: translateY(10px)

@media(max-width 1200px)
  .twocols
    div
      width 100% !important
</style>
