<template lang="pug">
div
  UserKlausimas(:klausimas="block.klausimas")
  div.radio-border(:class="{error : error}")
    SelectEl(:items="variantai" :error="block.isError" v-model="block.answer" :small="true")
</template>

<script>
import UserKlausimas from '@/components/elements/Apklausa/Klausimas.vue';
import SelectEl from '@/components/elements/SelectEl.vue'

export default {
  components: {
    UserKlausimas,
    SelectEl
  },
  props: {
    block: {
      type: Object,
    },
    error: {
      type: Boolean,
    },
  },
  computed: {
    variantai() {
      if (this.block.atsakymu_variantai) {
        return this.block.atsakymu_variantai.map((item) => ({
          name: item.variantas,
        }));
      }
      return false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.radio-border
  border:1px solid #fff;
  padding: 2px;
  border-radius 4px
.error
  border-color: #f49090;
</style>
