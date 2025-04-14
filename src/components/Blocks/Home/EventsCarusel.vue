<template lang="pug">
div.events(v-if="items && items[this.active]")
  icon(:data="triangleornamentData" v-bind:original="true").tr
  div.container
    div.left
      div.date(v-if="formatDate" v-bind:key="active")
        div.d {{formatDate.d}}
        div
          div.name {{formatDate.m}}
          div.weekday {{formatDate.dw}}
      div.type
        div.ico
          icon(:data="eventData" color="#5A98C8" width="10" height="14")
        div {{$t('event')}}
      router-link(v-bind:to="items[active].link")
        div.title {{items[active].title}}
      div.more 
        router-link(v-bind:to="items[active].link") {{$t('more2')}}
      div.location(v-if="items[active].location")
        div.ico
          icon(:data="locationData" color="#5A98C8" width="12" height="17")
        div {{items[active].location}}
      div.pagination
        div(v-for="(item,index) in items" v-bind:class="{active:index===active}" v-on:click="setactive(index)")
    div.right
      div.pos
        router-link(v-bind:to="items[active].link")
          LazyImg(v-bind:key="active" v-bind:image="items[active].img" v-bind:cover="true")
</template>

<script>
import { format, parse } from 'date-fns';
import LazyImg from '@/components/elements/LazyImg.vue'
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted } from 'vue';
import triangleornamentData from '@/assets/svg/triangle_ornament_yellow.svg'
import locationData from '@/assets/svg/location.svg'
import eventData from '@/assets/svg/event.svg'

export default {
  name: 'EventsCarusel',
  data() {
    return {
      triangleornamentData,
      locationData,
      eventData
    };
  },
  props: ['items'],
  components: {
    LazyImg,
  },
  setup(props) {
    const { t, locale } = useI18n(); 
    const active = ref(0); 
    const currentLocale = ref(null); 

    onMounted(async () => {
      if (locale.value === 'lt') {
        currentLocale.value = (await import('date-fns/locale/lt')).default;
      } else {
        currentLocale.value = (await import('date-fns/locale/en-US')).default;
      }
    });

    const formatDate = computed(() => {
      if (props.items && props.items[active.value] && props.items[active.value].start_date && currentLocale.value) {
        const date = parse(props.items[active.value].start_date, 'yyyy-MM-dd', new Date());
        return { 
          m: format(date, 'MMMM', { locale: currentLocale.value }), 
          d: format(date, 'd', { locale: currentLocale.value }),
          dw: format(date, 'iiii', { locale: currentLocale.value })
        };
      }
      return false;
    });

    const setActive = (index) => {
      active.value = index;
    };

    return {
      active,
      formatDate,
      setActive,
      t, 
    };
  }
};
</script>

<style scoped lang="stylus">
.events
  width: 100%
  background-color: #fff
  padding: 100px 0px
  position: relative
  overflow: hidden

  @media(max-width: 768px)
    padding: 40px 0px

  .tr
    width: 520px
    height: auto
    position: absolute
    left: -20px
    top: 40px

  .container
    filter: drop-shadow(20px 30px 20px rgba(0, 50, 125, 0.2))

    @media(max-width: 768px)
      filter: drop-shadow(10px 10px 10px rgba(0, 50, 125, 0.2))

    display: flex
    flex-wrap: wrap
    justify-content: space-between

    @media(max-width: 768px)
      flex-wrap: wrap
      justify-content: center

    .left
      background-color: #F6FAFF
      padding: 50px

      @media(max-width: 768px)
        padding: 20px
        padding-top: 30px

      .date
        padding-top: 15px
        padding-bottom: 5px
        border-top: 2px solid #5A98C8
        border-bottom: 2px solid #5A98C8
        display: flex
        align-items: center
        justify-content: space-between
        margin-bottom: 20px

        .d
          font-size: 52px
          line-height: 52px
          font-weight: 800
          font-family: 'Spartan', sans-serif
          color: #5A98C8
          text-align: center

        .name
          color: #5A98C8
          font-size: 20px
          line-height: 20px
          font-weight: 700
          margin-bottom: 6px
          font-family: 'Spartan', sans-serif

        .weekday
          color: #5A98C8
          font-size: 14px
          line-height: 14px
          font-family: 'Spartan', sans-serif
          font-weight: 500

      .type
        font-family: 'Spartan', sans-serif
        display: flex
        align-items: center
        font-size: 12px
        line-height: 14px
        font-weight: 500
        color: #5A98C8
        letter-spacing: 0.3px
        margin-bottom: 30px

        .ico
          margin-right: 10px

      .title
        min-height: 132px
        font-family: 'Spartan', sans-serif
        font-size: 32px
        letter-spacing: -0.2px
        line-height: 44px
        color: #231F4D
        font-weight: 800
        margin-bottom: 20px

      .more
        font-family: 'Spartan', sans-serif
        font-size: 12px
        line-height: 12px
        font-weight: 600
        color: #5A98C8
        margin-bottom: 20px

        a
          text-decoration: underline

      .location
        border-top: 1px solid rgba(90, 152, 200, 0.2)
        padding-top: 20px
        padding-bottom: 20px
        color: #6B798B
        font-size: 14px
        line-height: 20px
        display: flex

        .ico
          margin-right: 10px

      .pagination
        display: flex
        div
          cursor: pointer
          margin-right: 4px

          &:last-child
            margin-right: 0

          width: 40px
          height: 20px
          position: relative

          &.active
            &:after
              background-color: #5A98C8

          &:after
            transition: 0.2s all
            content: ''
            position: absolute
            left: 0px
            top: 50%
            height: 4px
            margin-top: -2px
            width: 100%
            background-color: #DDE2EC

  .right
    position: relative

    .pos
      position: absolute
      left: 0px
      top: 0px
      width: 100%
      height: 100%

    @media(max-width: 768px)
      .pos
        position: static

</style>
