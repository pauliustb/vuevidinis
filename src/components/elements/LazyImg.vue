<template lang="pug">
  div.img(ref="target" :class="{ cover: cover }")
    img(
      v-if="image && image.placeholder"
    :src="image.placeholder.src"
      :height="image.placeholder.h"
      :width="image.placeholder.w"
      :class="{ 'hide-placeholder': full_img_loaded }"
    ).placeholder
    img(
      v-if="full_img_loaded && image && image.resized"
      :src="image.resized.src"
      :height="image.resized.h"
      :width="image.resized.w"
      :class="{ 'show-loaded': full_img_loaded }"
    ).loaded
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'LazyImg',
  props: ['image', 'cover'],
  setup(props) {
    const target = ref(null);
    const full_img_loaded = ref(false);
    const observer = ref(null);

    onMounted(() => {
      observer.value = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && props.image && props.image.resized) {
              const newImg = new Image();
              newImg.onload = () => {
                full_img_loaded.value = true;
              };
              newImg.src = props.image.resized.src;
              if (target.value) {
                observer.value.unobserve(target.value);
              }
            }
          },
          {
            threshold: 0,
            rootMargin: '100px',
          }
      );

      if (target.value) {
        observer.value.observe(target.value);
      }
    });

    onBeforeUnmount(() => {
      if (observer.value && target.value) {
        observer.value.unobserve(target.value);
      }
    });

    return {
      target,
      full_img_loaded,
    };
  },
};
</script>

<style scoped lang="stylus">
.img
  overflow hidden
  position relative
  width 100%
  height 100%

  &.cover
    img
      width 100%
      height 100%
      object-fit cover !important

  img
    display block
    object-fit cover
    max-width 100%
    height: auto;

  .placeholder
    position relative
    z-index 2
    filter: blur(2vw);
    transform: scale(1);
    transition 1s all;

    &.hide-placeholder
      opacity 0;
      transform: scale(1.05);

  .loaded
    position absolute
    left 0px
    top 0px
    width 100%
    height 100%
    z-index 1
    opacity 0
    transition opacity 1s ease-in-out;

    &.show-loaded
      opacity 1
      z-index 2

</style>