<template lang="pug">
div.lang
  div(v-for="(item, index) in languages" v-bind:key="index" v-bind:class="{active:$i18n.locale===item.name}")
    a(v-bind:href="item.url" v-on:click.prevent="openurl(item)") {{item.name}}
</template>

<script>

export default {

  name: 'UserLang',
  components: {
  },
  created() {

  },
  data() {
    return {
      droplangs: false,
      search: false,
      languages: [
        { name: 'lt', url: '/' },
        { name: 'en', url: '/en/' },
      ],
    };
  },
  computed: {
  },
  methods: {
    openurl(item) {
      this.droplangs = false;
      this.$http.get(window.location.href, {
      }).then((rsp) => {
        if (rsp.data) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(rsp.data, 'text/html');
          const alternate = htmlDoc.querySelectorAll('[rel="alternate"]');
          let found = false;
          if (alternate) {
            alternate.forEach((e) => {
              const lang = e.getAttribute('hreflang');
              if (lang === item.name) {
                const href = e.getAttribute('href');
                if (href) {
                  found = true;
                  window.location = e.getAttribute('href');
                }
              }
            });
          }
          if (found === false) {
            window.location = item.url;
          }
        }
      });
    },
    opensearch() {
    },
  },
};

</script>

<style scoped lang="stylus">
.lang{
  display: flex;
  width: 100%;
  color: #132458;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  font-family: 'Spartan', sans-serif;
  justify-content: space-between;
  a{
    text-decoration: none;
    display: block;
  }
  .active {
    a{
      color:#5A98C8;
    }
  }
}
</style>
