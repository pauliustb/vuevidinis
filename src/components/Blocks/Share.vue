<template lang="pug">
div.share
  div.name {{$t('share')}}:
  div.list
    a(v-on:click.prevent="share('fb')" href="#")
      icon(:data="faData" color="#5A98C8" width="6" height="12")
    a(v-on:click.prevent="share('tw')" href="#")
      icon(:data="twData" color="#5A98C8" width="15" height="12")
    a(v-on:click.prevent="share('ln')" href="#")
      icon(:data="lnData" color="#5A98C8" width="12" height="12")
</template>

<script>
import faData from '@/assets/svg/fa.svg'
import twData from '@/assets/svg/tw.svg'
import lnData from '@/assets/svg/ln.svg'


export default {

  name: 'UserShare',
  props: ['url'],
  components: {
  },
  created() {
  },
  data() {
    return {
      faData,
      twData,
      lnData
    };
  },
  computed: {
  },
  methods: {
    share(type) {
      let url = '';
      if (type === 'fb') {
        url = `https://www.facebook.com/sharer.php?u=${encodeURI(this.url)}`;
      }
      if (type === 'tw') {
        url = `https://twitter.com/share?url=${encodeURI(this.url)}`;
      }
      if (type === 'ln') {
        url = `https://www.linkedin.com/shareArticle?url=${encodeURI(this.url)}`;
      }
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped lang="stylus">
.share
  width 100%
  .name 
    font-family: 'Spartan', sans-serif;
    font-size 12px
    line-height 12px
    margin-bottom 14px
    font-weight 500
    color #5A98C8
  .list 
    flex-wrap wrap
    display flex 
    a 
      display flex
      width 38px
      height 38px
      border 1px solid #5A98C8
      border-radius 50%
      margin-right 14px
      justify-content: center;
      align-items: center;
      &:last-child
        margin-right 0px
</style>
