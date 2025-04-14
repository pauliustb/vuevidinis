<template lang="pug">
div.klausimai
  div.klausimas-wrapper(v-for="(block, index) in blocks" :key="index")
    component(v-bind:is="block.acf_fc_layout" :block="blocks[index]" :answer.sync="localAnswer" :error="blocks[index].isError")
    // pre {{localAnswer}}
</template>

<script>
import KlausimasIrIrasomasAtsakymas from '@/components/elements/Apklausa/KlausimasIrIrasomasAtsakymas.vue';
import KlausimasIrAtsakymoBalas from '@/components/elements/Apklausa/KlausimasIrAtsakymoBalas.vue';
import KlausimasIrAtsakymuPasirinkimas from '@/components/elements/Apklausa/KlausimasIrAtsakymuPasirinkimas.vue';

export default {
  components: {
    KlausimasIrIrasomasAtsakymas,
    KlausimasIrAtsakymoBalas,
    KlausimasIrAtsakymuPasirinkimas,
  },
  props: {
    blocks: {
      type: Array,
    },
    answer: {
      type: String,
    },
    localAnswer: {
      type: Object,
    },
  },
  data() {
    return {
      array: [],
      testaz: false,
    };
  },
  watch: {
    localAnswer(value) {
      // this.$emit('input', value);
      this.$emit('update:answer', value);
    },
  },

};
</script>

<style lang="stylus" scoped>
.klausimai
  position: relative
  &:after
    transition: all .5s ease
  &.sending
    &:after
      position: absolute
      left:0
      top:0
      content: "";
      width: 100%;
      height: 100%;
      background-color: #FFF;
      opacity: 0.8
.klausimas-wrapper
  margin-bottom: 4rem
</style>
