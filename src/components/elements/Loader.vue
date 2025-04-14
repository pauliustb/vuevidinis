<template lang="pug">
div.loader(:class="[color,size]")
  div.loader-default
</template>

<script>
export default {

  name: 'UserLoader',
  props: ['color', 'size'],
  components: {
  },
  created() {},
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {
  },
};

</script>

<style scoped lang="stylus">
.loader-default{
  width: 30px;
  height: 30px;
  border: solid 4px #fff;
  border-left-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}
.loader {
  padding: 10px 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  &.white{
    .loader-default{
      border-color: #fff;
      border-left-color: transparent;
    }
  }
  &.dark{
    .loader-default{
      border-color: #5A98C8;
      border-left-color: transparent;
    } 
  }
  &.min{
    .loader-default{
      width: 15px;
      height: 15px;
      border-width: 2px;
    }
  }
}
@keyframes rotation{
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
</style>
