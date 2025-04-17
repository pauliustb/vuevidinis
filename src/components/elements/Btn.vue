<template lang="pug">
router-link(v-if="to" v-bind:to="to" v-bind:class="[color,{disabled:disabled},size, {uppercase:uppercase},{loading:loading},{active:active},{lowround:lowround}]").btn
  div.ico(v-if="$slots['left'] && !loading").leftico
    slot(name="left")
  div.text(v-bind:class="[textAligin]")
    div.t(v-if="!loading") {{text}}
    UserLoader(size="mid" v-bind:color="color" v-if="loading")
  div.ico(v-if="$slots['right'] && !loading").rightico
    slot(name="right")
a.btn(v-else v-on:click.prevent="handleClick"
      v-bind:class="[color,{disabled:disabled},size, {uppercase:uppercase},{loading:loading},{active:active},{lowround:lowround},{wider:wider}]"
      v-bind:href="href")
  div.ico(v-if="$slots['left'] && !loading").leftico
    slot(name="left")
  div.text(v-bind:class="[textAligin]")
    div.t(v-if="!loading") {{text}}
    UserLoader(size="mid" v-bind:color="color" v-if="loading")
  div.ico(v-if="$slots['right'] && !loading").rightico
    slot(name="right")
</template>

<script>
import UserLoader from '@/components/elements/Loader.vue';

export default {

  name: 'UserBtn',
  props: ['color', 'href', 'disabled', 'size', 'uppercase', 'loading', 'text', 'textAligin', 'active', 'lowround', 'to', 'wider'],
  components: {
    UserLoader
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
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style scoped lang="stylus">
.btn{
  height: 46px;
  padding: 5px 12px;
  z-index: 1;
  font-size 13px
  overflow: hidden;
  text-decoration: none;
  user-select: none;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 140px;
  min-width: 100px;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
  border-radius: 0px;
  transition: all 0.3s ease-in-out;
  font-family: 'Spartan', sans-serif;
  &.wider{
    max-width: 200px;
  }
  &:before{
    content: '';
    z-index: -1;
    position: absolute;
    top: 0%;
    left 0%;
    width: 100%;
    height: 100%;
    border-radius: 0%;
        transform-origin: 50% 50%;
    transform: translate3d(0%, 0%, 0) scale3d(0, 1, 0);
    transition: transform 0.35s ease-in-out;
  }
  >>>svg path{
    transition: all 0.3s ease-in-out;
  }
  &:hover::before,&.active::before,&:focus:before{
    transform: translate3d(0%, -0%, 0) scale3d(1, 1, 1);
  }
  .text{
    &.center{
      text-align: center;
      justify-content: center;
    }
    &.left{
      text-align: left;
          width: 100%;
    }
    &.right{
    }
  }
  .leftico{
    
  }
  .rightico{
    
  }
  &.white{
    color: #5A98C8 !important;
    background-color: #F3F4F9;
      >>>svg path{
       fill: #5A98C8;
      }
    &:before{
      background-color: #DDE9F6;
    }
    &:hover,&.active,&:focus{
      color #5A98C8;
      >>>svg path{
       fill: #5A98C8;
      }
    }
    .text {
      color: inherit !important;
      font-size 13px !important
    }
  }

  &.yellow{
    color: #304EA4;
    background-color: #FFD400;
    &:before{
      background-color: #246CB5;
    }
    &:hover,&.active,&:focus{
      color #fff;
      >>>svg path{
       fill: #fff;
      }
    }
    .text {
      font-size 13px
    }
  }

  &.blue{
    color: #fff;
    background-color: #5A98C8;
    &:before{
      background-color: #246CB5;
    }
    &:hover,&.active,&:focus{
      color #fff;
      >>>svg path{
       fill: #fff;
      }
    }
    .text {
      font-size 13px
    }
  }
  &.green{
    color: #fff;
    border: 2px solid #2BAC76;
    background-color: #2BAC76;
    &:before{
      background-color: #fff;
    }
    &:hover,&.active,&:focus{
      border-color #2BAC76;
      color #2BAC76;
      >>>svg path{
       fill: #2BAC76;
      }
    }
    &:focus{
      color:#fff;
      &:before{
        background-color: #2BAC76;
      }
    }
    &.disabled{
      &:focus{
        background-color #F2F5F9 !important;
        opacity: 0.9;
        color #CFD5E1;
        pointer-events: none;
        &:before{
        background-color: #F2F5F9;
      }
      }
    }

  }

  &.min{
    height: 40px;
  }
  &.mid{
    height: 50px;
  }
  &.max{
    height: 60px;
    min-width: 150px;
    max-width:none;
    padding-left 40px;
    padding-right 40px;
  }
  &.circle{
    width: 40px;
    height: 40px;
    max-width: 40px;
    min-width: 40px;
    border-radius: 50%;
    .ico{
      margin: 0;
    }
  }
  &.disabled{
    background-color #F2F5F9 !important;
    opacity: 0.9;
    color #CFD5E1;
    pointer-events: none;
  }
  &.loading{
    pointer-events: none;
  }
  &.uppercase{
    text-transform: uppercase;
  }
  &.lowround{
    border-radius: 4px;
  }
}
@media (max-width: 600px){
  .btn.max{
    font-size: 16px;
    letter-spacing: 1px;
    padding: 10px 15px;
  }
}
</style>
