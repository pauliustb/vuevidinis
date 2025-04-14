<template lang="pug">
div.upload
  input(type="file" accept="image/*" v-bind:disabled="false" v-on:change="filesChange($event.target.name, $event.target.files)" v-if="type==='img'")
  div.file(v-if="type==='img'")
    div
      div.imgc(v-if="showplaceholder===false")
        img(ref="img" v-bind:src="list.url")
      div.placeholder(v-if="showplaceholder")
        icon(:data="uploadData" color="#555" width="39" height="26")
        div.text {{text}}
    div
      div.error(v-if="error") {{error}}
      UserBtn(color="blue" v-bind:href="'#'" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="btntext" textAligin="center")
  div.notimg(v-if="type==='file'")
    div(v-if="list").list
      div(v-for="(file,index) in list" v-bind:key="file.id" v-bind:class="{disabled:disable}")
        div.name
          a(v-if="file.url" target="_BLANK" v-bind:href="file.url") {{file.name}} 
          span(v-else) {{file.name}}
        div.actions(v-if="editable")
          UserLoader(v-if="file.url===false" color="dark" size="min")
          div.delete(v-else v-on:click="del(file, index)")
            icon(:data="closeData" color="#5A98C8" width="14" height="14")
    div.error(v-if="error") {{error}}
    div.up(v-if="editable")
      input(type="file" v-bind:disabled="false" v-on:change="filesChange($event.target.name, $event.target.files)" multiple)
      UserBtn(color="white" v-bind:href="'#'" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="btntext" textAligin="center")
</template>

<script>
/* eslint-disable */
// import { mapGetters } from 'vuex';
// import Vue from 'vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserLoader from '@/components/elements/Loader.vue';
import uploadData from '@/assets/svg/upload.svg'
import closeData from '@/assets/svg/close.svg'

export default {

  name: 'UploadFile',
  props: ['type', 'text', 'value', 'action', 'editable', 'deleteAction', 'id', 'btntext'],
  components: {
    UserBtn,
    UserLoader
  },
  created() {
    if (this.value) {
      this.showplaceholder = false;
      if(Array.isArray(this.value)){
        this.list = [...this.value];
      } else {
        this.list = {...this.value};
      }
    }
  },
  data() {
    return {
      uploadData,
      closeData,
      showplaceholder: true,
      name: '',
      list: false,
      error: false,
      loading: false,
      disable: false,
    };
  },
  computed: {
    // ...mapGetters('Pages', [
    //   'home',
    // ]),
  },
  methods: {
    filesChange(fieldName, fileList) {
      this.error = false;
      if (!fileList.length) return;
      if (this.type === 'img'){ //img gali buti tik 1
        const ValidImageTypes = ["image/jpeg", "image/png"];
        if(fileList[0] && ValidImageTypes.indexOf(fileList[0].type) !== -1) {
          if (fileList[0].size / 1024 / 1024 < 2) {
            const reader  = new FileReader();
            this.showplaceholder = false;
            this.list = false;
            reader.onloadend = () => {
              this.$refs.img.src = reader.result;
            };
            reader.readAsDataURL(fileList[0]);
            this.loading = true;
            this.$store.dispatch(this.action, {file:fileList[0], id:this.id}).then(data=> {
              this.$store.dispatch('user/getCurrent');
              this.loading = false;
              if (data.status === false){
                this.error = data.text;
              } else {
                this.list = data.files; 
                this.$emit('input', this.list);
              }
            });
          } else {
            this.error = 'max 2mb';
          }  
        } else {
          this.error = 'jpg, png';
        }
      } else {
        if(fileList.length > 0) {
          this.list = this.list.concat( Array.from(fileList).map((elem) => {
            return {name: elem.name, url: false};
          }));
          this.$emit('input', this.list);
          this.disable = true;
          this.$store.dispatch(this.action, {file:fileList, id:this.id}).then(data=> {
            this.disable = false;
            if (data.status === false) {
              this.list = data.files;
              this.error = data.text;
              this.$emit('input', this.list);
            } else {
              this.list = data.files;
              this.$emit('input', this.list);
            }
            // this.list = data;
          });
        }
        // if(fileList[0]) {
        //   this.showplaceholder = false;
        //   this.name = fileList[0].name;
        //   this.$emit('file', fileList[0]);
        // }
      }
    },
    del(file, index) {
      Vue.set( this.list, index, {...file, url: false} );
      this.$emit('input', this.list);
      this.disable = true;
      this.$store.dispatch(this.deleteAction, {file:file, id:file.id}).then(data => {
        this.disable = false;
        if (data.status === false) {
           Vue.set( this.list, index, {...file} );
        } else {
          this.list = data.files;
        }
        this.$emit('input', this.list);
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.upload
  position: relative

  input
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 10
    opacity: 0
    cursor: pointer

  .file
    display: flex
    align-items: center
    gap: 20px
    flex-wrap: wrap
    .placeholder
      border-radius: 4px
      background-color: #f1f1f1
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      padding 10px

      .svg
        opacity: 0.2

      .text
        text-align: center
        color: #555555
        font-size: 11px
        font-weight: 500
        line-height: 11px
        margin-top: 6px

  >>> .btn
    cursor: pointer
    max-width: 160px

.error
  color: #e74d56
  font-size: 12px
  margin-bottom: 4px

.notimg
  .up
    position: relative

  .list
    margin-bottom: 10px

    > div.disabled
      opacity: 0.8
      pointer-events: none

    a
      text-decoration: none
      color: #3f4555

    > div
      justify-content: space-between
      padding: 5px 20px
      color: #6b798b
      font-size: 12px
      font-weight: 400
      width: 100%
      display: flex
      align-items: center
      margin-bottom: 2px
      height: 36px
      border-radius: 4px
      border: 1px solid #dde9f6
      background-color: #ffffff

    .delete
      cursor: pointer

.filename
  margin-right: 10px
  color: #969798
  font-size: 13px
  font-weight: 400

.imgc
  img
    max-width: 100%

</style>
