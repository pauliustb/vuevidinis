<template lang="pug">
div
  div.preview(v-on:click="play" v-bind:class="{playing:previewel===false}")
    LazyImg(v-bind:image="preview").previewimg
    div.over
      div.play
        icon(:data="playData" width="100" height="70" color="#fff")
    div.video(v-if="previewel===false")
      div.iframe-wrapper(v-if="type=='global'")
        div.player
          iframe(v-bind:src="url+'?autoplay=1'" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="1")
      //- vue-media-embed(v-if="type=='global'" v-bind:source="url" v-bind:auto-play="1" v-bind:allow-fullscreen="0")
      video(v-if="type=='local'" preload="metadata" loop playsinline autoplay controls ref="video")
        source(v-bind:src="url" type="video/mp4")
</template>
<script>
import LazyImg from '@/components/elements/LazyImg.vue';
// import playData from '@/assets/svg/play.svg';

export default {

  name: 'VideoEl',
  props: ['type', 'url', 'preview', 'autoplay', 'click'],
  components: {
    LazyImg
  },
  mounted() {
    if (this.autoplay === true) {
      this.previewel = false;
    }
  },
  data() {
    return {
      playData,
      previewel: true,
    };
  },
  computed: {
  },
  methods: {
    play() {
      if (this.previewel === true && this.click === true) {
        this.previewel = false;
      }
    },
  },
  beforeUnmount() {
  },
};
</script>

<style scoped lang="stylus">
video{
  width: 100%;
  position: relative;
  z-index: 2;
}
.iframe-wrapper{
  top: 0;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 0px;
    height: 0;
}
.iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.preview{
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  img{
      max-width: 100%;
  }
  .over{
    background-color: rgba(3, 43, 97, 0.2);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    .play{
      transition: all 0.3s;
      transform: scale(1);
    }
  }
  &:hover{
  }
  &.playing{
    background: none;
    background-image: none !important;
    height: auto;
    min-height: auto;
    .previewimg{
      display: none;
    }
    .play{
      display: none;
    }
  }
}
.play{

}
.video{
  width: 100%;
  >>>.wrapper{
    padding-top: 0px;
  }
}
</style>
