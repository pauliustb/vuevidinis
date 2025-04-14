<template lang="pug">
  div.txt
    div.counter {{ counter }}/{{ max }}
    //- UserInput(v-model="this.modelValue" type="textarea" :maxlength="max" :disabled="disabled" :error="error")
    UserInput(:modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" type="textarea" :maxlength="max" :disabled="disabled" :error="error")
</template>

<script>
import UserInput from '@/components/elements/Userinput.vue';

export default {
  name: 'TextAreaCounter',
  components: {
    UserInput,
  },
  props: ['disabled', 'modelValue', 'max', 'error'],
  computed: {
    counter() {
      return this.modelValue ? this.modelValue.length : 0;
    },
  },
  
};
</script>

<style scoped lang="stylus">
.txt {
  position: relative;
  .counter {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border: 0;
    border-bottom: 0px;
    width: calc(100% - 2px);
    text-align: right;
    background: #fff;
    z-index: 10;
    position: absolute;
    left: 1px;
    top: 1px;
    padding: 8px 10px;
    color: #a2a9b5;
    line-height: 12px;
    font-size: 12px;
    font-weight: 400;
  }
  >>> textarea {
    padding-top: 28px !important;
  }
}
</style>