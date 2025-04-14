<template lang="pug">
div.events
  div.list
    SingleMinEvent(v-for="(item, index) in items" v-bind:item="item" v-bind:key="index")
  div.btnc
    UserBtn(v-bind:to="{name:'Events'}" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('allevents')" textAligin="center")
</template>

<script>
import SingleMinEvent from '@/components/Blocks/Home/SingleMinEvent.vue';
import UserBtn from '@/components/elements/Btn.vue';

export default {

  name: 'VerticalEvents',
  props: ['items'],
  components: {
    SingleMinEvent,
    UserBtn
  },
  created() {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.events
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width 100%
  min-height 410px
  background-color #F6FAFF
  filter: drop-shadow(20px 30px 20px rgba(4, 44, 106, 0.2));
  padding 30px 40px
  @media(max-width 768px)
    padding 30px  20px
  .btnc
    display flex 
    justify-content flex-end
</style>
