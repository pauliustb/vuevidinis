<template lang="pug">
div.avatar
  UploadFile(type="img" text="" v-bind:btntext="$t('user.pasirinktifaila')" v-model="imgc" v-bind:action="'user/EditAvatar'" v-bind:deleteAction="''" v-bind:id="false" v-bind:editable="true")
</template>

<script>
import UploadFile from '@/components/Blocks/UploadFile.vue';

export default {

  name: 'AvataForm',
  components: {
    UploadFile,
  },
  props: ['img'],
  created() {
    if (this.img) {
      this.imgc = { ...this.img };
    }
  },
  data() {
    return {
      imgc: false,
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped lang="stylus">
.avatar
  width 100%

</style>
