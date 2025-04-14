<template lang="pug">
  div.outer
    div#main
      Menu

      div.main_page_content
        router-view(v-slot="{ Component }")
          transition(name="maintransition" mode="out-in" appear)
            component(:is="Component")

      FooterEl
      PhotoSwipeContainer
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore, mapGetters } from 'vuex';

import Menu from '@/components/Menu.vue';
import FooterEl from '@/components/FooterEl.vue';
import PhotoSwipeContainer from '@/components/photoswipe/PhotoSwipeContainer.vue';

export default {
  name: 'app',
  inject: ['$mq'],
  components: {
    Menu,
    FooterEl,
    PhotoSwipeContainer,
  },
  computed: {
    ...mapGetters('Menu', {
      activeHamburger: 'hamburger',
    }),
  },
  created() {
    this.$store.dispatch('routes/getRoutes');
  },
  mounted() {
  
  },
  setup() {
    const store = useStore();
    const user = ref(null);

    onMounted(async () => {
      try {
    const response = await store.dispatch('user/getCurrent');

    const userData = response?.user;
    // const lang = userData?.language;

    if (response?.status === true && userData) {
      user.value = userData;

      // if (lang) {
      //   store.commit('i18n/setLocale', lang);
      // }
    } else {
      console.warn('User fetch succeeded but data is missing or invalid:', response);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
    });

    return {
      user,
    };
  },
};
</script>

<style src="./assets/css/global.css"></style>