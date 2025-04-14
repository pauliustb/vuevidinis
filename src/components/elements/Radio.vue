<template lang="pug">
div.chekbox(v-on:click="setactivevalue" v-bind:class="[{active:value==true, error:error, inline:inline},size, dir]")
  div.in
    div.c
      div.rut
    div.text(v-if="text") {{text}}
</template>

<script>

export default {

  name: 'UserRadio',
  props: {
    value: {},
    size: {},
    error: {},
    dir: {},
    inline: {
      type: Boolean,
      default: false,
    },
    text: {},
  },
  components: {
  },
  created() {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    setactivevalue() {
      this.$emit('input', !this.value);
    },
  },
  beforeUnmount() {
  }
  // beforeDestroy() {
  // },
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
    border-radius: 50%;
    border: 1px solid #e7eff2;
    background-color: #ffffff;
    position: relative;
    background: #fff;
    margin-right: 15px;
    .rut{
      opacity: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color #000;
    }
  }
  .text{
      padding-top: 2px;
    color: #000000;
    font-size: 12px;
    line-height 14px;
    font-weight: 400;
    line-height: normal;
    >>>a{
      color: #032b61;
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
    border: 1px solid #4487FF;
  }
}
&.inline{
  margin-top:1rem;
  display: inline-flex;
  flex-direction: row;
  margin-right: 2rem;
  flex-wrap: wrap;
  .in{
    display:inline-flex;
  }
}
&.error{
  .c{
    border-color: #fe6e49;
  }
}
&.active{
  .c{
    .rut{
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
