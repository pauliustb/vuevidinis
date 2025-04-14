<template lang="pug">
  div.filter
    div.search
      UserInput(
        v-bind:placeholder="$t('searchby')"
        v-bind:modelValue="localKeyword" 
        v-on:update:modelValue="updateKeyword" 
        type="input"
        v-on:click="submit"
        v-bind:error="false"
        v-bind:disabled="false"
      )
    div.tax
      UserLoader(color="dark" v-if="loading")
      div(v-else).list
        div(
          v-for="item in list"
          v-on:click="toggletax(item)"
          v-bind:class="{ active: activeTax.find((e) => e.slug === item.slug) }"
        )
          div
            div.c
              icon(:data="checkmarkData" width="10" height="8" color="#fff").check
          div {{ item.name }}
</template>

<script>
import UserInput from '@/components/elements/Userinput.vue';
import { debounce } from 'throttle-debounce';
import UserLoader from '@/components/elements/Loader.vue';
import checkmarkData from '@/assets/svg/checkmark.svg';

export default {
  name: 'MentoriaiFilter',
  props: ['store'],
  components: {
    UserInput,
    UserLoader,
  },
  created() {
    this.$store.dispatch(`${this.store}/getTax`).then(() => {
      this.loading = false;
    });
  },
  mounted() {},
  data() {
    return {
      checkmarkData,
      loading: true,
      activeSlugs: false,
      activeActiveArray: [],
      activeUrlSlugString: false,
      localKeyword: this.$store.getters[`${this.store}/activeKeyword`],
    };
  },
  computed: {
    list() {
      return this.$store.getters[`${this.store}/tax`];
    },
    activeTax() {
      return this.$store.getters[`${this.store}/activeTax`];
    },
    activeKeyword() {
      return this.$store.getters[`${this.store}/activeKeyword`];
    },
    urlString() {
      return this.activeActiveArray.map((e) => e.slug).toString();
    },
  },
  methods: {
    submit() {},
    updateKeyword(value) {
      this.localKeyword = value;
      this.setKeyword(value);
    },
    setKeyword: debounce(500, function (value) {
      this.$store.dispatch(`${this.store}/setFilterKeyword`, value);
    }),
    toggletax(item) {
      this.$store.dispatch(`${this.store}/setFilterTax`, item);
      this.toggleUrlSlug(item);
      this.$router.push({ query: { sritis: this.urlString } });
    },
    toggleUrlSlug(item) {
      const findIndex = this.activeActiveArray.findIndex((e) => e.slug === item.slug);
      if (findIndex === -1) {
        this.activeActiveArray.push(item);
      } else {
        const delIndex = this.activeActiveArray.findIndex((e) => e.slug === item.slug);
        this.activeActiveArray.splice(delIndex, 1);
      }
    },
  },
  watch: {
    loading(val) {
      if (!val) {
        if (typeof this.$route.query.sritis !== 'undefined') {
          this.activeUrlSlugs = this.$route.query.sritis.split(',');
          if (this.activeUrlSlugs) {
            this.activeUrlSlugs.forEach((el) => {
              const findIndex = this.list.filter((obj) => obj.slug === el);
              this.toggleUrlSlug(findIndex[0]);
              this.$store.dispatch(`${this.store}/setFilterTax`, findIndex[0]);
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.filter
  width 100%

  .search
    margin-bottom 30px

  .list
    display flex
    flex-wrap wrap

    >div
      white-space nowrap
      user-select none

      &.active
        color #5A98C8
        background-color #DDE9F6

        .c
          background-color #5A98C8

      .c
        display flex
        justify-content center
        align-items center
        width 20px
        height 20px
        background-color #fff
        border 1px solid #DDE9F6
        transition 0.2s all

      padding 10px 20px
      margin-bottom 8px
      margin-right 8px
      background-color #F2F5F9
      display flex
      justify-content flex-start
      gap 10px
      align-items center
      font-size 14px
      line-height 14px
      color #6B798B
      border-radius 4px
      cursor pointer
      transition 0.2s all

      &:hover
        background-color #DDE9F6

</style>
