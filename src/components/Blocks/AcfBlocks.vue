<template lang="pug">
div.blocks
  div.block(v-for="(block, index) in blocks" :key="block.acf_fc_layout+'-'+index")
    component(:is="block.acf_fc_layout" :data="block")
    // pre {{block.acf_fc_layout}}
</template>

<script>
import TekstinioTurinioBlokas from '@/components/Blocks/AcfBlocks/TekstinioTurinioBlokas.vue';
import SarasasSuVarnelemis from '@/components/Blocks/AcfBlocks/SarasasSuVarnelemis.vue';
import UserFaq from '@/components/Blocks/AcfBlocks/Faq.vue';

export default {
  components: {
    TekstinioTurinioBlokas,
    SarasasSuVarnelemis,
    UserFaq,
  },
  props: {
    blocks: {
      type: Array,
    },
  },
};
</script>

<style lang="stylus" scoped>
.block
  margin-top:50px;
  margin-bottom:60px;
</style>
