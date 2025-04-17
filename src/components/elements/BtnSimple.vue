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

  name: 'BtnSimple',
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
  min-height: 46px;
  padding: 5px 12px;
  z-index: 1;
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
    max-width: 250px;
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
    margin-right: 10px;
  }
  .rightico{
    margin-left: 10px;
  }
  &.white{
    color: #5A98C8;
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
  }
  &.blue{
    color: #fff;
    background-color: #5A98C8;
    &:before{
      background-color: #246CB5;
    }
    &:hover,&.active,&:focus{
      background:#3a74a1;
      color #fff;
      >>>svg path{
        fill: #fff;
      }
    }
  }
  &.darkblue{
    color: #fff;
    background-color: #25408F;
    &:before{
      background-color: #246CB5;
    }
    &:hover,&.active,&:focus{
      background:#3a74a1;
      color #fff;
    }
  }
  &.grey{
    color: #5A98C8;
    background-color: #F3F4F9;

    &:before{
      background-color: #246CB5;
    }
    &:hover,&.active{
      background:#3a74a1;
      color #fff;

      .text {
        .t {
          color: #fff;
          font-size: 13px
        }
      }
    }
    .text {
      .t {
        color: #5A98C8;
        font-size: 13px
      }
    }
  }
  &.green{
    color: #fff;
    border: 2px solid #2BAC76;
    background-color: #2BAC76;
    &:hover,&.active{
      border-color #34be84;
      background-color #34be84;
      color #FFF;
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

  &.blue, &.darkblue, &.grey, &.green {
    .text {
      .t {
        font-size: 13px;
      }
    }
  }
</style>
