<template lang="pug">
div
  UserLoader(color="dark" v-if="loadingStories")
  div(v-else)
    div.filter
      div
        SelectEl(v-bind:items="cities" v-bind:placeholder="$t('filter.city')" v-model="city" ico="location")
      div
        SelectEl(v-bind:items="periods" v-bind:placeholder="$t('filter.period')" v-model="period" ico="calendar")
    div.list
      div.top.split
        div {{$t('filter.data')}}
        div {{$t('filter.tema')}}
        div {{$t('filter.vieta')}}
        div
      transition-group(name="list-complete" tag="div" v-if="filtered").mid
        div.item(v-for="item in filtered" v-bind:key="item.id").split
          div.date(v-if="!item.ivykesEvent")
            div.d {{item.parsedate.d}}
            div
              div.m {{item.parsedate.m}}
              div.dw {{item.parsedate.dw}}
          div.ivykes(v-else)
            span {{$t('filter.ivykes')}} {{item.parsedate.y}} {{item.parsedate.m}} {{item.parsedate.d}}
          div.title(:class="{old : item.ivykesEvent}")
            router-link(v-bind:to="item.link") {{item.title}}
          div.loc
            div
            icon(:data="locationData" color="#5A98C8" width="12" height="18")
            div {{item.location}}
          div
            UserBtn(v-bind:to="item.link" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('more2')" textAligin="center")
</template>

<script>
import { mapGetters } from 'vuex';
import {
  parse,
  add,
  compareAsc,
  format,
} from 'date-fns';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';
import locationData from '@/assets/svg/location.svg'
import SelectEl from '@/components/elements/SelectEl.vue'
import { lt } from 'date-fns/locale';
let locale = lt;  
export default {

  name: 'EventsFilter',
  components: {
    UserLoader,
    UserBtn,
    SelectEl
  },
  created() {
  this.$store.dispatch('Events/get').then(() => {
    this.loadingStories = false;
  });
},
  data() {
    return {
      loadingStories: true,
      city: '',
      period: '',
      ivykesEvent: '',
      locationData
    };
  },
  computed: {
    ...mapGetters('Events', {
      list: 'list',
    }),
    cities() {
      if (this.list && this.list.length > 0) {
        // return [...new Set(this.list.map((e) => e.miestas))].sort().map((e) => (
        //   { val: e, name: e }
        // )).filter((e) => (e.name));
        return [...new Set(this.list.map((e) => {
          const miestas = String(e.miestas).trim();
          return miestas;
        }))]
          .sort()
          .map((e) => ({ val: e, name: e }))
          .filter((e) => e.name);
      }
      return false;
    },
    periods() {
      const periods = JSON.parse(this.$t('filter.periods'));
      return periods.map((item, index) => {
        let val = 7;
        if (index === 0) {
          val = 7;
        }
        if (index === 1) {
          val = 30;
        }
        if (index === 2) {
          val = 90;
        }
        return {
          val,
          name: item,
        };
      });
    },
    parseItems() {
      if (this.list) {
        return this.list.map((e) => {
          let ivykesEvent = '';

          const now = Date.now();
          const date = parse(e.start_date, 'yyyy-MM-dd', new Date());

          if (compareAsc(now, date) === 1) {
            ivykesEvent = true;
          } else {
            ivykesEvent = false;
          }

          const parsedate = {
            m: format(date, 'MMMM', { locale }),
            d: format(date, 'd', { locale }),
            y: format(date, 'y', { locale }),
            dw: format(date, 'iiii', { locale }),
            date,
          };
          return { ...e, parsedate, ivykesEvent };
        });
      }
      return false;
    },
    filtered() {
      if (this.parseItems) {
        let items = this.parseItems;

        if (this.city) {
          items = items.filter((e) => e.miestas.trim() === this.city.val);
        }
        
        if (this.period) {
          const now = Date.now();
          const next = add(now, { days: this.period.val });
          items = items.filter((e) => {
            const date = e.parsedate.date;
            if (compareAsc(date, next) === -1 && e.ivykesEvent === false) {
              return true;
            }
            return false;
          });
        }
        const reversedItems = items.reverse();
        console.lo
        reversedItems.sort((a, b) => a.ivykesEvent - b.ivykesEvent);
        return reversedItems;
      }
      return false;
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="stylus">
.filter
  display grid
  grid-template-columns repeat(2, 260px)
  gap 44px
  margin-bottom 60px

  @media (max-width 768px)
    grid-template-columns repeat(2, 1fr)
    gap 20px
    margin-bottom 40px

  @media (max-width 600px)
    display flex
    flex-wrap wrap
    gap 20px

.list
  .split
    display grid
    grid-template-columns 200px auto 340px 120px
    gap 20px

    @media (max-width 1024px)
      grid-template-columns 140px auto 160px 100px

    @media (max-width 768px)
      display flex
      flex-wrap wrap
      gap 20px 10px

    @media (max-width 600px)
      display flex
      flex-wrap wrap
      gap 20px 10px

  .top
    height 24px
    border-bottom 1px solid #DDE9F6
    font-family 'Spartan', sans-serif
    font-size 12px
    line-height 24px
    font-weight 500
    color #B0C5DC
    margin-bottom 20px

    @media (max-width 768px)
      display none

  .mid
    margin-bottom 60px
    position relative

    .item
      align-items center
      transition all 0.3s
      min-height 80px
      border-bottom 1px solid #DDE9F6
      padding 5px 0px

      @media (max-width 768px)
        &:first-child
          border-top 1px solid #DDE9F6
        padding 20px 0px

      .date
        display flex
        align-items center
        gap 20px

        @media (max-width 1024px)
          gap 10px

        .d
          text-align center
          color #5A98C8
          font-family 'Spartan', sans-serif
          font-size 38px
          line-height 38px
          font-weight 800

          @media (max-width 1024px)
            font-size 30px
            line-height 30px

        .m
          font-family 'Spartan', sans-serif
          font-size 14px
          line-height 14px
          color #5A98C8
          font-weight 700
          margin-bottom 5px

        .dw
          font-family 'Spartan', sans-serif
          font-size 12px
          line-height 12px
          color #5A98C8
          font-weight 500

        &.old
          color red !important

      .ivykes
        span
          color #aeaeae

      .title
        color #231F4D
        font-size 16px
        line-height 20px
        font-family 'Spartan', sans-serif
        font-weight 700
        letter-spacing -0.2px

        &.old
          color #aeaeae

      .loc
        display flex
        align-items center
        gap 10px
        color #6B798B
        font-size 14px
        line-height 20px

</style>
