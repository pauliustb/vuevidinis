<template>
  <div class="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg" />
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item" />
        <div class="pswp__item" />
        <div class="pswp__item" />
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter" />
          <button
            class="pswp__button pswp__button--close"
            title="(Esc)"
            @click="close"
          />
          <button
            class="pswp__button pswp__button--fs"
            @click="toggleFullscreen"
          />
          <button
            class="pswp__button pswp__button--zoom"
            @click="toggleZoom"
          />
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="(arrow left)"
          @click="prevImage"
        />
        <button
          class="pswp__button pswp__button--arrow--right"
          title="(arrow right)"
          @click="nextImage"
        />

        <div class="pswp__caption">
          <div class="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe";
import "photoswipe/dist/photoswipe.css"; 

export default {
  name: "v-photoswipe",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),  
    },
  },
  data() {
    return {
      pswp: null,
    };
  },
  watch: {
    items: {
      handler() {
        if (this.pswp && this.isOpen) {
          this.pswp.invalidateCurrItems();
          this.pswp.updateSize(true); 
        }
      },
      deep: true,
    },
    isOpen(val) {
      if (val) {
        this.openPhotoSwipe(this.items, this.options);
      } else {
        this.close();
      }
    },
  },
  methods: {
    openPhotoSwipe(items, options) {
      let pswpElement = this.$el;
      this.pswp = new PhotoSwipe(pswpElement, PhotoSwipe, items, options);

      this.pswp.listen("beforeChange", () => {
      });

      this.pswp.listen("close", () => {
      });

      this.pswp.init();
    },
    close() {
      if (this.pswp) {
        this.pswp.close();
      }
    },
    prevImage() {
      if (this.pswp) {
        this.pswp.prev();
      }
    },
    nextImage() {
      if (this.pswp) {
        this.pswp.next();
      }
    },
    toggleFullscreen() {
      if (this.pswp) {
        this.pswp.toggleFullscreen();
      }
    },
    toggleZoom() {
      if (this.pswp) {
        this.pswp.toggleZoom();
      }
    },
  },
  mounted() {
    if (this.isOpen) {
      this.openPhotoSwipe(this.items, this.options);
    }
  },
  beforeUnmount() {
    this.close(); 
  },
};
</script>

<style scoped>
.pswp__button {
  cursor: pointer;
}

.pswp__caption__center {
  text-align: center;
}

</style>
