<template lang="pug">
div.stories(v-if="list")
  icon(:data="triangleornamentblueData" v-bind:original="true").tr1
  icon(:data="triangleornamentyellowData" v-bind:original="true").tr2
  div.container
    div.title(v-if="title") {{title}}
    div.list(v-if="list")
      StorieListItem(v-for="(item, index) in list" v-bind="item" v-bind:key="index")
    div.btnc
      UserBtn(v-bind:to="{name: 'UserStories'}" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('morestories')" textAligin="center")
</template>

<script>
import StorieListItem from '@/components/Blocks/StorieListItem.vue';
import UserBtn from '@/components/elements/Btn.vue';
import triangleornamentblueData from '@/assets/svg/triangle_ornament_blue.svg'
import triangleornamentyellowData from '@/assets/svg/triangle_ornament_yellow_right.svg'

export default {

  name: 'UserStories',
  props: ['title', 'list'],
  components: {
    StorieListItem,
    UserBtn,
  },
  created() {
  },
  data() {
    return {
      triangleornamentblueData,
      triangleornamentyellowData
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.stories
  overflow: hidden
  position: relative
  padding: 100px 0px
  background-color: #F6F9FC

  .tr1
    position: absolute
    left: -40px
    top: 100px
    width: 370px
    height: auto
    transform: rotate(180deg) scaleX(-1)

  .tr2
    position: absolute
    right: -150px
    width: 370px
    bottom: 100px
    height: auto

  .container
    position: relative
    z-index: 2
    max-width 100% !important
    width 100% !important

  @media(max-width: 1024px)
    padding: 60px 0px

  .title
    text-align: center
    font-family: 'Spartan', sans-serif
    font-size: 36px
    line-height: 40px
    color: #231F4D
    font-weight: 800
    margin-bottom: 70px
    letter-spacing: -0.2px

  .list
    display: flex
    flex-wrap: wrap
    gap: 44px
    margin-bottom: 60px

    @media(max-width: 1024px)
      gap: 20px
      margin-bottom: 40px

    @media(max-width: 768px)
      flex-direction: column
      gap: 20px

  .btnc
    display: flex
    justify-content: center

@media(max-width: 1200px)
  .itemstory
    width 100%
</style>
