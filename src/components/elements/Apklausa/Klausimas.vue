<template lang="pug">
div.klausimas-text(v-if="klausimas")
  h4 {{klausimas}}
</template>

<script>
export default {
  name: "UserKlausimas",
  props: {
    klausimas: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.klausimas-text
  h4
    font-weight: 600
    color:#231F4D
    margin-bottom .5rem
</style>
