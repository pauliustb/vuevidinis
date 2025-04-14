<template lang="pug">
div.out(v-bind:class="{on:on, disabled:disabled}")
  div.cont(v-on:click="toggle")
    div.in
    div.explanation(v-if="showYesNo")
      div Ne
      div Taip
  div.text
    span(v-if="on===false")
    span(v-if="on===true")

</template>
<script>

export default {

  name: 'YesNo',
  props: ['value', 'disabled', 'showYesNo'],
  components: {
  },
  mounted() {
    this.on = this.value;
  },
  data() {
    return {
      on: true,
    };
  },
  computed: {
  },
  methods: {
    toggle() {
      this.on = !this.on;
      this.$emit('input', this.on);
    },
  },
  beforeUnmount() {
  }
  // beforeDestroy() {
  // },
};
</script>

<style scoped lang="stylus">
.out{
  display: flex;
  align-items: center;
}
.explanation{
  position:absolute;
  bottom:-18px;
  left:0;
  font-size:12px;
  display:flex;
  flex-wrap:nowrap;
  justify-content: space-between;
  width:100%;
}
.disabled{
pointer-events: none;
opacity: 0.4;
}
.text{
  color: #ea4450;
font-size: 14px;
font-weight: 300;
line-height: 14px;
}
.cont{
  position:relative
  margin-right: 15px;
  cursor: pointer;
  width: 60px;
height: 34px;
background-color: #de6464;

border-radius: 17px;
display: flex;
align-items: center;
padding: 3px;
  .in{
        transition: .4s;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-radius: 14px;
  }

}
  .on{
    .cont{
    background-color: #5a98c8;
  }
    .text{
      color: #0050fa;
    }
    .in{
      transform: translateX(26px);
    }
  }
</style>
