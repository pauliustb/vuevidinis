<template lang="pug">
  transition(name="intro" appear :duration="{ enter: 1000, leave: 0 }")
    div.pagec(:key="title")
      div.toppage
        icon(v-if="rightico === 'triangle_ornament_yellow_right'" :data="triangleornamentyellowrightData" :original="true").tr
        icon(v-if="rightico === 'triangle_ornament_blue_right'" :data="triangleornamentbluerightData" :original="true").tr
        icon(v-if="rightico === 'triangle_ornament'" :data="triangleornamentData" :original="true").tr
        icon(v-if="leftico === 'triangle_ornament_blue'" :data="triangleornamentblueData" :original="true").tr2
        icon(v-if="leftico === 'triangle_ornament_yellow'" :data="triangleornamentyellowData" :original="true").tr2
        
        div.container
          h1 {{ title }}
          div.text(v-if="text && text !== ''")
            UserWyswyg(:html="text")
            div.imgc(v-if="img && img !== ''")
            LazyImg(:image="img" :cover="false")
        
      div.slot
        <slot></slot>
  </template>
  
  <script>
  import UserWyswyg from "@/components/elements/Wyswyg.vue";
  import LazyImg from "@/components/elements/LazyImg.vue";
  import triangleornamentyellowrightData from '@/assets/svg/triangle_ornament_yellow_right.svg'
  import triangleornamentbluerightData from '@/assets/svg/triangle_ornament_blue_right.svg'
  import triangleornamentData from '@/assets/svg/triangle_ornament.svg'
  import triangleornamentblueData from '@/assets/svg/triangle_ornament_blue.svg'
  import triangleornamentyellowData from '@/assets/svg/triangle_ornament_yellow.svg'
  
  export default {
    name: "TopPage",
    components: { 
      UserWyswyg,
      LazyImg,
    },
    props: {
  title: {
    type: String,
    default: '', 
  },
  text: {
    type: String,
    default: '', 
  },
  img: {
    type: [String, null],
    default: null,
  },
  lefto: [Boolean, String],
  righto: [Boolean, String],
},
data() {
    return {
      triangleornamentyellowrightData,
      triangleornamentbluerightData,
      triangleornamentData,
      triangleornamentblueData,
      triangleornamentyellowData
    };
  },
    computed: {
      leftico() {
        if (this.lefto === "triangle_ornament_yellow") return "triangle_ornament_yellow";
        if (this.lefto === true) return "triangle_ornament_blue";
        return false;
      },
      rightico() {
        if (this.righto === "blue") return "triangle_ornament_blue_right";
        if (this.righto === "triangle_ornament") return "triangle_ornament";
        if (this.righto === true) return "triangle_ornament_yellow_right";
        return false;
      },
    },
  };
  </script>
  
<style scoped lang="stylus">
  .pagec
    overflow hidden
    min-height 80vh
  .toppage
    width 100%
    padding-top 50px
    position relative
    margin-bottom 60px
    .container
      position relative
      z-index 2
    .imgc
      margin-top 40px
    .tr 
      position absolute
      top 0px
      right -5px
      width 380px
      height auto
    .tr2
      position absolute
      bottom -460px
      left -5px
      width 380px
      height auto
    h1
      font-family: 'Spartan', sans-serif
      font-size 36px
      line-height 44px
      letter-spacing -1px
      font-weight 800
      text-transform: none !important
      color #231F4D
      @media(max-width 768px)
        font-size 20px
        line-height 26px
    .text
      margin-top 30px
      font-size 14px
      line-height 22px
      font-weight 300
      color #6B798B
      max-width 670px
  .slot
    position relative
  
  .intro-enter-active
    h1 
      transition all 0.2s ease-in 0.2s
    .text
      transition all 0.2s ease-in 0.4s
    .imgc
      transition all 0.2s ease-in 0.6s
    .tr,.tr2
      >>>path[pid="0"]
        transition all 0.2s ease-in 0.5s
      >>>path[pid="1"]
        transition all 0.2s ease-in 0.4s
      >>>path[pid="2"]
        transition all 0.2s ease-in 0.6s
    .slot
      transition all 0.2s ease-in 0.8s
  .intro-enter
    h1
      transform translateX(-10px)
      opacity 0
    .text
      opacity 0
      transform translateY(-10px)
    .imgc
      opacity 0
      transform translateY(-10px)   
    .tr,.tr2
      >>>path[pid="0"]
        opacity 0 
        transform translateY(10px) translateX(0px)
      >>>path[pid="1"]
        opacity 0 
        transform translateY(-10px)
      >>>path[pid="2"]
        opacity 0 
        transform translateY(10px) translateX(-10px)
    .slot
      opacity 0
      transform translateY(-10px)  
</style>
  