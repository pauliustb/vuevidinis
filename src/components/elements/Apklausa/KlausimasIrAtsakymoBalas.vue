<template lang="pug">
div
  UserKlausimas(:klausimas="block.klausimas")
    UserWyswyg.skales-komentaras(v-if="block.skales_komentaras_kuris_rodomas_po_klausimu" v-bind:html="block.skales_komentaras_kuris_rodomas_po_klausimu")
  div.radio-border(:class="{error : error}")
    RadioBox(v-for="index in 5" :key="'pasirinkimas-'+index" :label="index" :value="index" v-model="block.answer")
</template>

<script>
import UserKlausimas from '@/components/elements/Apklausa/Klausimas.vue';
import UserRadio from '@/components/elements/Radio.vue';
import RadioBox from '@/components/elements/RadioBox.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';

export default {
  components: {
    UserKlausimas,
    UserRadio,
    RadioBox,
    UserWyswyg
  },
  props: {
    block: {
      type: Object,
    },
    error: {
      Type: Boolean,
    },
  },
  data() {
    return {
      MySelectedValue: '',
    };
  },
};
</script>

<style lang="stylus" scoped>
.skales-komentaras
  margin-bottom .5rem
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  color: #6b798b;
  max-width: 670px;
.radio-border
  border:1px solid #fff;
  padding: 2px;
  border-radius 4px
.error
  border-color: #f49090;
</style>
