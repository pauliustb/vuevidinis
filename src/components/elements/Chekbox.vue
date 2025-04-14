<template lang="pug">
div.chekbox(@click="setactivevalue" :class="[{active: modelValue, error: error}, size, dir]")
  div.in
    div.c
      icon(:data="checkmarkData" width="11" height="8" color="#000").check
    div.text(v-html="placeholder")

</template>

<script>
import checkmarkData from '@/assets/svg/checkmark.svg'

export default {

  name: 'UserChekbox',
  props: {
    placeholder: String,
    modelValue: Boolean,
    size: String,
    error: Boolean,
    dir: String,
  },
  components: {
  },
  created() {
  },
  data() {
    return {
      checkmarkData
    };
  },
  mounted() {
  },
  methods: {
    setactivevalue() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
  beforeUnmount() {
  }
};
</script>

<style  scoped lang="stylus">
.chekbox{
  user-select: none;
  cursor: pointer;
  .c{
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all;
    width: 20px;
    height: 20px !important;
    border-radius: 0px;
    border: 1px solid #707070;
    background-color: #ffffff;
    position: relative;
    background: #fff;
    margin-right: 15px;
    >>>svg{
      opacity: 0;
    }
  }
  .text{
      padding-top: 2px;
    color: #22242F;
    font-size: 14px;
    line-height 14px;
    font-weight: 400;
    line-height: normal;
    >>>a{
      color: #22242F;
      text-decoration: underline;
    }
  }
  .check{
  }
  .in{
   display: flex; 
 }
 &:hover{
  .c{
    border: 1px solid #495ec5;
  }
}
&.error{
  .c{
    border-color: #fe6e49;
  }
}
&.active{
  .c{
    >>>svg{
      opacity: 1;
    }
  }
}
&.right{
  .in{
    .text{
      margin-right: 15px;
    }
  }
  .c{
    margin-right: 0px;
    order: 2;
  }
}
}
</style>
