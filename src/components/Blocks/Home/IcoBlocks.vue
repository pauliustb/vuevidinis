<template lang="pug">
div.icoblocks
  div.title
    h2 {{$t('mentorystesprocesas')}}
  div.c
    div.item(v-for="item in items")
      div.ico 
        img(v-bind:src="item.ico")
      div.title 
        h3 {{item.title}}
        div.deco-arrow
          icon(:data="yellowarrowrightData" v-bind:original="true")
      div.text(v-html="item.text")
</template>

<script>
import yellowarrowrightData from '@/assets/svg/yellow-arrow-right.svg'

export default {

  name: 'IcoBlocks',
  props: ['items'],
  components: {
  },
  created() {
  },
  data() {
    return {
      yellowarrowrightData
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.icoblocks
  width 100%
  padding-top 80px 
  padding-bottom 60px 

  .title
    position: relative
    h2
      text-align center
      font-family: 'Spartan', sans-serif
      font-size 36px
      line-height 40px
      color #231F4D
      font-weight 800
      margin-bottom 60px
      letter-spacing -0.2px
    .deco-arrow
      position absolute
      right -35px
      top 0
      width 20px

  .c 
    display: grid
    grid-template-columns: repeat(5, 1fr)
    gap: 80px 70px

    @media (max-width: 768px)
      grid-template-columns: repeat(2, 1fr)
      gap: 20px 40px

    justify-content: center

  .item
    position relative
    &:last-child
      .title
        .deco-arrow
          display none
    @media (max-width: 768px)
      .title
        .deco-arrow
          right -15px
      &:nth-child(even)
        .title
          .deco-arrow
            display none

  .ico
    text-align center 
    margin-bottom 34px
    img 
      max-width 100%
      max-height 70px

  .title
    font-family 'Spartan', sans-serif
    font-size 18px
    line-height 22px
    font-weight 800
    color #231F4D
    text-align center
    margin-bottom 18px

  .text
    font-size 16px
    line-height 22px
    color #6B798B
    text-align center

</style>
