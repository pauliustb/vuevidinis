<template lang="pug">
transition(name="intro" appear v-bind:duration="{ enter: 1000, leave: 0 }")
  div.intro-wrapper
    div.intro
    div.full-container-intro(:style="{ backgroundImage: img_bg ? `url(${img_bg})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }")
      div.intro-content
        div.left
          div.logoc
            img.logo(v-if="img" v-bind:src="img")
          div
            h1(v-if="title" v-html="title")
            div.text(v-if="text" v-html="text")
        div.right
          icon(:data="triangleData" v-bind:original="true").tr
          // VerticalEvents(v-if="events && events.length > 0" v-bind:items="events").ontop

</template>

<script>
import { mapGetters } from 'vuex';
import VerticalEvents from '@/components/Blocks/Home/VerticalEvents.vue';
import triangleData from '@/assets/svg/triangle_ornament.svg'

export default {
  name: 'UserIntro',
  components: {
    VerticalEvents,
  },
  created() {
  this.$store.dispatch('Pages/getHome').then(() => {
  }).catch(err => {
    console.error("Failed to fetch home data", err);
  });
  },
  
  data() {
    return {
      triangleData
    };
  },
  computed: {
  ...mapGetters('Pages', ['home']),
  title() {
    return this.home?.intro?.title || 'Default Title';
    },
    text() {
      return this.home?.intro?.text || 'Default Text';
    },
    img_bg() {
    return this.home?.intro?.img_bg || '';
    },
    img() {
    return this.home?.intro?.img || '';
    },
    events() {
      return this.home?.intro?.events || []; 
    },
  },
  methods: {

  },
  
};
</script>

<style lang="stylus">
.intro
  overflow hidden
  width 100%

.full-container-intro
  height 550px
  position relative

  .intro-content
    display flex
    align-items center
    justify-content space-between
    width 100%
    height 100%
    padding-left 60px
    position relative
    flex-wrap wrap
    gap 180px
    @media(max-width 1024px)
      gap 60px
    @media(max-width 768px)
      flex-wrap wrap
      gap 40px
      height auto
      padding-top 80px
      padding-left 20px
      padding-right 20px

  .img-full
    position absolute
    img
      object-fit contain

  .logo
    max-width 200px
    height auto

.left
  display flex
  align-self center
  z-index 11
  justify-content flex-start
  width auto
  @media(max-width 1200px)
    flex-direction column
    justify-content center
    align-items center

  .logoc
    width 200px

  > div:nth-child(2)
    margin-left 40px

h1
  max-width 800px
  font-size 38px
  line-height 50px
  font-weight 800
  color #fff
  text-transform uppercase
  margin-bottom 40px
  font-family 'Spartan', sans-serif
  text-transform: none
  @media(max-width 1024px)
    font-size 26px
    line-height 34px

h1 strong
  color #FFD400 !important
  font-weight 800

.text
  max-width 800px
  font-size 16px
  line-height 24px
  font-weight 300
  color #fff

.intro-content 
  h1 
    text-transform uppercase
.right
  z-index 10
  position relative

  .tr
    z-index -1
    position absolute
    right -40px
    top -200px
    width 280px
    height auto
    @media(max-width 768px)
      top -90px
      right -20px
      width 300px
      height auto

.intro-enter-active
  transition all 0.2s ease-in

  h1
    transition all 0.2s 0.2s ease-in

  .text
    transition all 0.2s 0.4s ease-in

  .logo
    transition all 0.2s ease-in

  .right
    .tr
      path[pid="0"]
        transition all 0.2s 0.5s ease-in
      path[pid="1"]
        transition all 0.2s 0.4s ease-in
      path[pid="2"]
        transition all 0.2s 0.6s ease-in

    .ontop
      transition all 0.2s 0.8s ease-in

.intro-enter
  h1
    opacity 0
    transform translateX(-10px)

  .text
    opacity 0
    transform translateY(-10px)

  .logo
    opacity 0

  .tr
    path[pid="0"]
      opacity 0
      transform translateY(10px) translateX(0px)
    path[pid="1"]
      opacity 0
      transform translateY(-10px)
    path[pid="2"]
      opacity 0
      transform translateY(10px) translateX(-10px)

  .ontop
    opacity 0
    transform translateY(-10px)

@media(max-width 1200px)
  .left
    .logoc
      display: none;

    > div:nth-child(2)
      margin-left: 0;
  h1 
    display flex
    flex-direction column

  .full-container-intro
    background-size inherit !important
    background-position unset !important

  .intro-content
    h1 
      text-transform uppercase

    .right 
      width 100%


    
</style>
