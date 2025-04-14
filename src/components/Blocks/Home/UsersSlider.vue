<template lang="pug">
  div.user
    div.container
      h2 {{$t('mentoriai')}}
    div.list
      swiper(
        :modules="[Navigation, Pagination]"
        :slides-per-view="'auto'"
        :slides-per-group="1"
        :space-between="44"
        :loop="false"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        :pagination="{ clickable: true, el: '.swiper-pagination' }"
      )
        swiper-slide.slide(v-for="(item, index) in items" :key="index")
          div.imgc
            LazyImg(v-if="item.img" :image="item.img" :cover="true").img
          div.name {{ item.first_name }} {{ item.last_name }}
          div.pareigos_ir_imone(v-if="item.pareigos_ir_imone") {{ item.pareigos_ir_imone }}
          router-link(:to="item.link")

      div.swiper-button-prev
      div.swiper-button-next
      div.swiper-pagination

    div.btnc(v-if="menotoriuLink")
      UserBtn(
        :to="menotoriuLink.url"
        :active="false"
        color="blue"
        :disabled="false"
        :loading="false"
        :uppercase="false"
        :text="menotoriuLink.title"
        textAlign="center"
      )
</template>

<script>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LazyImg from '@/components/elements/LazyImg.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import UserBtn from '@/components/elements/Btn.vue';

export default {
  name: 'UsersSlider',
  props: {
    items: Array,
    menotoriuLink: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
    LazyImg,
    UserBtn
  },
  setup() {
    return {
      Navigation,
      Pagination
    };
  }
};
</script>

<style scoped lang="stylus">
.btnc
  margin-top 30px
  display flex
  justify-content center

.user
  padding-top 80px
  padding-bottom 80px
  width 100%

  h2
    font-family 'Spartan', sans-serif
    text-align center
    font-size 36px
    line-height 36px
    letter-spacing -0.2px
    color #231F4D
    font-weight 800
    margin-bottom 60px

  .list
    overflow hidden
    padding 0 20px
    position relative
    padding-bottom 50px

    .swiper-container
      position relative

    .swiper-button-prev, .swiper-button-next
      position absolute
      bottom 10px
      color #fff
      opacity 1
      width 50px
      height 50px
      background #B0C5DC
      transition all .4s ease
      &:after
        font-size 20px

    .swiper-button-disabled
      opacity .2

    .slide
      width 360px
      max-width 100%
      transform translate3d(0px, 0px, 0px)
      position relative

      a
        z-index 2
        position absolute
        left 0px
        top 0px
        width 100%
        height 100%

      .imgc
        position relative
        width 100%
        height 360px
        margin-bottom 20px
        overflow: hidden
        img
          width 100%
          height 100%
          object-fit: cover

      .name
        font-size 18px
        line-height 20px
        margin-bottom 5px
        font-weight 500
        color #231F4D

      .pareigos_ir_imone
        color #6B798B
        line-height 20px
        font-size 14px
        font-weight 300

    .swiper-pagination
      position absolute
      width 100%
      left 0px
      bottom 0px
      text-align center
      z-index 2

    .swiper-pagination-bullets
      display flex
      justify-content center

    .swiper-pagination-bullet
      width 12px
      height 12px
      background-color #ccc
      border-radius 50%
      margin: 0 5px

    .swiper-pagination-bullet-active
      background-color #231F4D
</style>
