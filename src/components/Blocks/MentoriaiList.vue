<template lang="pug">
  div.mentoriai
    UserLoader(color="dark" v-if="loading")
    div(v-else)
      div.listcontainer(v-if="list && list.length > 0")
        div.list
          div(v-for="item in list")
            router-link(v-bind:to="item.link")
            div.imgc
              LazyImg(v-if="item.img" v-bind:image="item.img" v-bind:cover="true").img
            div.name {{item.title}}
            div.pareigos(v-if="item.text" v-html="item.text")
            div.tax(v-if="item.taxs")
              div(v-for="tax in item.taxs") {{tax}}
        div.more(v-if="list.length < total")
          UserBtn(v-if="loadingBtn === false" v-bind:href="'#'" v-on:click="loadmore" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('more')" textAligin="center")
          UserLoader(v-else color="dark")
      div(v-else) {{$t('nerasta')}}
  </template>
  
  <script>
  import UserBtn from '@/components/elements/Btn.vue';
  import UserLoader from '@/components/elements/Loader.vue';
  import axios from 'axios'; // Importuojame axios
  
  export default {
    name: 'MentoriaiList',
    props: ['store'],
    components: {
      UserBtn,
      UserLoader,
    },
    data() {
      return {
        loadingBtn: false,
        cancelTokenSource: null, // Pridedame cancelTokenSource
      };
    },
    created() {
      this.cancelTokenSource = axios.CancelToken.source(); // Sukuriame cancelTokenSource
      if (this.page === 0) {
        this.$store.dispatch(`${this.store}/getAll`, {
          cancelToken: this.cancelTokenSource.token, // Perduodame cancelToken
        }).then(() => {
          // this.loading = false;
        });
      }
    },
    beforeUnmount() {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel('Component unmounted');
      }
    },
    computed: {
      list() {
        return this.$store.getters[`${this.store}/list`];
      },
      total() {
        return this.$store.getters[`${this.store}/total`];
      },
      loading() {
        return this.$store.getters[`${this.store}/loading`];
      },
      page() {
        return this.$store.getters[`${this.store}/page`];
      },
    },
    methods: {
      loadmore() {
        this.loadingBtn = true;
        this.$store.dispatch(`${this.store}/getAll`, {
          cancelToken: this.cancelTokenSource.token, // Perduodame cancelToken
        }).then(() => {
          this.loadingBtn = false;
        });
      },
    },
  };
  </script>

<style scoped lang="stylus">
.mentoriai
  width 100%

  .list
    margin-bottom 40px
    display grid
    grid-template-columns repeat(4, 1fr) 
    gap 30px

    > div:nth-child(n+5)
      margin-top 60px

    @media (max-width 1258px)
      grid-template-columns repeat(4, 1fr) 

    @media (max-width 1024px)
      grid-template-columns repeat(2, 1fr) 
      gap 20px 30px

      > div:nth-child(n+3)
        margin-top 60px

    @media (max-width 600px)
      grid-template-columns 1fr
      gap 20px 30px

      > div:nth-child(n+2)
        margin-top 60px

    > div
      position relative
      width 100% // Now each grid item takes full width inside the column
      margin-left 0px // Removed margin-left to avoid gaps (grid handles spacing)

    a
      z-index 5
      position absolute
      left 0
      top 0
      width 100%
      height 100%

    .imgc
      position relative
      width 100%
      height 266px
      margin-bottom 14px

    .name
      color #231F4D
      font-size 18px
      font-weight 500
      line-height 24px
      margin-bottom 5px

    .pareigos
      min-height 40px
      font-size 12px
      line-height 20px
      font-weight 300
      color #6B798B
      margin-bottom 10px

    .tax
      display flex
      flex-wrap wrap

      > div
        border-radius 4px
        background-color #F2F5F9
        padding 6px 15px
        color #6B798B
        font-size 12px
        line-height 12px
        margin-right 3px
        margin-bottom 3px

  .more
    display flex
    justify-content center

</style>
