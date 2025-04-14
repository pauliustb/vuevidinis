<template lang="pug">
  div(ref="target" :class="[{ active: enter }]").slot
  slot
  </template>
  
  <script>
  import { watch } from 'vue';
  import { useIntersectionObserver } from '@vueuse/core';
  
  export default {
    name: 'InteractIn',
    props: [],
    data() {
      return {
        enter: false,
      };
    },
    computed: {
      pos() {
        if (this.$mq.tablet) {
          return {
            threshold: [0],
            rootMargin: '-50px',
          };
        }
        return {
          threshold: [0],
          rootMargin: '-100px',
        };
      },
    },
    mounted() {
      const target = this.$refs.target;
  
      // Use Intersection Observer to detect when the element enters the viewport
      const { isIntersecting } = useIntersectionObserver(target, {
        threshold: this.pos.threshold,
        rootMargin: this.pos.rootMargin,
      });
  
      // Watch for changes in the intersection state
      watch(isIntersecting, (value) => {
        if (value) {
          this.enterin(); // Call enterin() when the element enters the viewport
        }
      });
    },
    methods: {
      enterin() {
        this.enter = true;
        this.$emit('enter');
      },
    },
  };
  </script>
  
  <style scoped lang="stylus">
  .slot{
    position: relative;
    transition: all 0.5s;
    transition-timing-function: ease-in-out;
    will-change: transform;
    transform: translateY(20px);
    opacity: 0;
    &.active {
      opacity: 1;
      transform: translateY(0px);
    }
  
    &.fade {
      transform: none;
      transition: opacity 1s;
    }
    &.left {
      transform-origin: left center;
    }
    &.center {
      transform-origin: center;
    }
    &.right {
      transform-origin: right center;
    }
  }
  </style>
  