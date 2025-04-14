<template lang="pug">
div.event 
  div.date
    div.d {{formatDate.d}}
    div
      div.name {{formatDate.m}}
      div.weekday {{formatDate.dw}}
  div.title {{item.title}}
  div.loc(v-if="item.location") {{item.location}}
  router-link(v-bind:to="item.link")
</template>

<script>
import { format, parse } from 'date-fns';
import { lt } from 'date-fns/locale'; // eslint-disable-line
let locale = false;

export default {

  name: 'SingleMinEvent',
  props: ['item'],
  components: {
  },
  created() {
    if (this.$i18n.locale === 'lt') {
      locale = lt;
    }
  },
  data() {
    return {

    };
  },
  computed: {
    formatDate() {
      if (this.item.start_date) {
        const date = parse(this.item.start_date, 'yyyy-MM-dd', new Date());
        return { 
          m: format(date, 'MMMM', { locale }),
          d: format(date, 'd', { locale }),
          dw: format(date, 'iiii', { locale }),
        };
      }
      return false;
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.event
  border-top: 2px solid #DDE9F6
  padding-top: 18px
  padding-bottom: 22px
  position: relative

  &:after
    content: ''
    position: absolute
    left: 0px
    top: -2px
    width: 50%
    height: 2px
    background-color: #5A98C8

  .date
    display: flex
    align-items: center
    justify-content: flex-start
    margin-bottom: 10px

    .d
      font-size: 32px
      line-height: 32px
      font-weight: 800
      font-family: 'Spartan', sans-serif
      color: #5A98C8
      text-align: center

    .name
      color: #5A98C8
      font-size: 12px
      line-height: 12px
      font-weight: 700
      margin-bottom: 6px
      font-family: 'Spartan', sans-serif

    .weekday
      color: #5A98C8
      font-size: 10px
      line-height: 10px
      font-family: 'Spartan', sans-serif
      font-weight: 500

  .title
    font-size: 15px
    line-height: 21px
    font-weight: 600
    color: #231F4D
    margin-bottom: 5px

  .loc
    font-size: 14px
    font-weight: 300
    line-height: 22px
    color: #6B798B

  a
    position: absolute
    left: 0px
    top: 0px
    width: 100%
    height: 100%

</style>
