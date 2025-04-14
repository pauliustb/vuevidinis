<template lang="pug">
div.atsiliepimai
  div.list
    swiper(v-bind:options="swiperOption" ref="data")
      swiper-slide.slide(v-for="(item, index) in items" v-bind:key="index")
        div.atsiliepimas-item
          div.atsiliepimas-item-wrapper
            div.atsiliepimas(v-if="item.atsiliepimas") {{item.atsiliepimas}}
              div.citata-icon
                icon(:data="citataData" width="20" height="20" color="#58A2DC")
            div.autorius(v-if="item.autorius") {{item.autorius}}
            div.veikla(v-if="item.autoriaus_veikla") {{item.autoriaus_veikla}}
    div.swiper-button-prev(slot="button-prev")
      div
        icon(:data="arrowfullData" width="20" height="20")
    div.swiper-button-next(lot="button-next")
      div
        icon(:data="arrowfullData" width="20" height="20")
</template>

<script>
import 'swiper/css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import citataData from '@/assets/svg/citata.svg'
import arrowfullData from '@/assets/svg/arrow-full.svg'

export default {
  props: {
    items: {
      type: Array,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      citataData,
      arrowfullData,
      swiperOption: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        simulateTouch: true,
        spaceBetween: 10,
        mousewheel: false,
        speed: 500,
        loop: false,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
        // autoplay: {
        //   delay: 2000,
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.pagination.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        on: {
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 44,
          },
          // 600: {
          //   slidesPerView: 'auto',
          //   spaceBetween: 20,
          // },
        },
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
.atsiliepimai
  position: relative;
  .atsiliepimas-item
    display:flex;
    align-items:center
    background:#F6F9FC;
    padding-top:3rem;
    padding-bottom:3rem;
    padding-left:5rem
    padding-right: 5rem
    justify-content: center
    flex-direction column
    .atsiliepimas-item-wrapper
      color:#6B798B;
      .autorius
        margin-top 2rem
        font-weight 600
      .veikla
        font-size:14px
      .atsiliepimas
        position: relative
        .citata-icon
          position absolute
          left -40px
          top 0
  .swiper-button-prev
    svg
      transform:rotate(270deg)
      fill:#5A98C8
        path
          fill:#5A98C8
  .swiper-button-next
    svg
      transform:rotate(90deg)
      fill:#5A98C8
        path
          fill:#5A98C8
  .swiper-button-prev::after,.swiper-button-next::after
    content: none;
  .swiper-button-next,.swiper-button-prev
    width: 50px
    height: 50px
    background: transparent;
    transition:all .4s ease
    svg
      transition:all .4s ease
      fill:#5A98C8;
    &:hover
      background: #5A98C8;
      svg
        fill: #fff;
  .swiper-button-prev
    left: -80px;
    @media(max-width 960px)
      left: 10px;
  .swiper-button-next
    right: -80px;
    @media(max-width 960px)
      right: 10px;

</style>
