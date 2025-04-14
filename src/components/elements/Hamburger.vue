<template lang="pug">
  div.hamburger.hamburger--slider(:class="{'is-active':active}")
    div.hamburger-box
      div.hamburger-inner
    div.back
  </template>
  
  <script>
  
  export default {
  
    name: 'UserHamburger',
    props: ['active'],
    components: {
    },
    created() {
    },
    data() {
      return {
  
      };
    },
    computed: {
  
    },
    methods: {
  
    },
    watch: {
  
    },
  };
  </script>
  
  <style scoped>
  .hamburger {
    user-select: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    border: 0;
    margin: 0;
    overflow: visible;
  }
  
  @media screen and (max-width: 768px) {
    .hamburger{
      width: 40px;
    }
  }
  
  .hamburger:hover {
  }
  
  .hamburger-box {
    width: 24px;
    height: 14px;
    display: inline-block;
    position: relative;
  }
  
  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }
  
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 24px;
    height: 3px;
    background-color: #25408F;
    position: absolute;
    transition-property: all;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  
  }
  
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: "";
    display: block;
  }
  
  .hamburger-inner::before {
    top: -5px;
  }
  .hamburger--slider.is-active .hamburger-inner:before, .hamburger--slider.is-active .hamburger-inner:after{
  width: 24px;
  }
  .hamburger-inner::after {
    bottom: -5px;
  }
  
  .hamburger--slider .hamburger-inner {
  top: 2px; }
  .hamburger--slider .hamburger-inner::before {
  top: 6px;
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 0.15s; }
  .hamburger--slider .hamburger-inner::after {
  top: 12px; }
  .hamburger--slider.is-active .hamburger-inner {
  transform: translate3d(0, 6px, 0) rotate(45deg); }
  .hamburger--slider.is-active .hamburger-inner::before {
  transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
  opacity: 0; }
  .hamburger--slider.is-active .hamburger-inner::after {
  transform: translate3d(0, -12px, 0) rotate(-90deg); }
  
  </style>
  