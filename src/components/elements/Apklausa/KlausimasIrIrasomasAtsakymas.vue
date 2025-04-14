<template lang="pug">
div
  UserKlausimas(:klausimas="block.klausimas")
  UserInput(type="input" :error="error" v-model="answeris" :placeholder="block.klausimo_laukelio_paaiskinimas_nebutinas ? block.klausimo_laukelio_paaiskinimas_nebutinas : null")
</template>

<script>
import UserInput from '@/components/elements/Userinput.vue';
import UserKlausimas from '@/components/elements/Apklausa/Klausimas.vue';

export default {
  components: {
    UserKlausimas,
    UserInput,
  },
  props: {
    block: {
      type: Object,
    },
    error: {
      type: Boolean,
    },
  },
  data() {
    return {
      answeris: '',
    };
  },
  watch: {
    answeris(value) {
      // this.$emit('input', value);
      this.$emit('update:answer', value);
    },
  },
};
</script>

<style scoped>

</style>
