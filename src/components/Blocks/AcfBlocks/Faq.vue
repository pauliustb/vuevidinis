<template lang="pug">
  div.block
    div.bloko-antraste(v-if="data.bloko_antraste")
      h3 {{data.bloko_antraste}}
    div.list-item(v-if="data.klausimas_ir_atsakymas.length" v-for="(klausimasAtsakymas, index) in data.klausimas_ir_atsakymas" :key="index")
      div.item-title
        div.icon-wrap
          icon.icon(:data="arrowData" color="#5A98C8" width="15" height="15" :class="{open: show === index}")
        div.faq-item
          h4(@click="toggle(index)") {{klausimasAtsakymas.klausimas}}
          transition(name="accordion"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end")
            div.faq-content(v-show="show === index")
              h5 {{klausimasAtsakymas.atsakymas}}
</template>

<script>
import arrowData from '@/assets/svg/arrow-full.svg'

export default {
  name: 'UserFaq',
  data() {
    return {
      arrowData,
      show: false,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // faqItems() {
    //   let faqItems = [];
    //   // this.single.klausimai.forEach((element) => this.apklausosLaukai.push(element));
    //   faqItems = this.data.klausimas_ir_atsakymas.map((i) => ({ ...i, open: false }));
    //   return faqItems;
    // },
  },
  methods: {
    toggle(index) {
      if (this.show === index) {
        this.show = false;
      } else {
        this.show = index;
      }
    },
    start(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    end(el) {
      el.style.height = '';
    },
  },
};
</script>

<style lang="stylus" scoped>
.bloko-antraste
 h3
  font-weight 600
  color:#5a98c8
  font-size 22px
  margin-bottom:30px
.faq-content
 h5
  padding-top 1.5rem
  color #6B798B
.list-item
  display:flex
  flex-direction:column
  border-bottom:1px solid #DDE9F6
  padding-top:1.5rem
  padding-bottom:1.5rem
  .item-title
    flex-grow: 1
    display:flex
    flex-direction: row
    .faq-item
      margin-left:30px
      h4
        cursor:pointer;
        font-weight: 500
        color: #040E30
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    .icon
      transition: all .4s ease
      width:20px
      &.open
        transform: rotate(180deg);
.accordion-enter-active, .accordion-leave-active
  will-change: height, opacity
  transition: height 0.3s ease, opacity .3s ease
  overflow: hidden
.accordion-enter, .accordion-leave-to
  height: 0 !important
  opacity: 0
</style>
