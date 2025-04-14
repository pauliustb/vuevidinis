<template lang="pug">
div.sendmsg
  div.ico
    icon(:data="messagesData" color="#5A98C8" width="34" height="24")
  div.title {{$t('writeletter')}}
  div.row
    UserInput(v-bind:placeholder="$t('messagesubject')+'*'" v-model="subject" type="input"
      v-bind:error="errorsubject" v-bind:disabled="disabled")
  div.row
    div.pl {{$t('message')+'*'}}
    UserInput(placeholder="" v-model="message" type="textarea"
      v-bind:error="errormessage" v-bind:disabled="disabled")
  div.btnc 
    div
      UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('send')" textAligin="center")
    div.rsp
      div(v-if="msg") {{msg}}
</template>

<script>
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';
import messagesData from '@/assets/svg/messages.svg'

export default {

  name: 'SendMessage',
  props: ['userID'],
  components: {
    UserInput,
    UserBtn
  },
  created() {
  },
  data() {
    return {
      messagesData,
      subject: '',
      errorsubject: false,
      message: '',
      errormessage: false,
      loading: false,
      disabled: false,
      msg: '',
    };
  },
  computed: {
  },
  methods: {
    submit() {
      let valid = true;
      this.errorsubject = false;
      this.errormessage = false;
      this.msg = '';
      if (!this.subject) {
        this.errorsubject = true;
        valid = false;
      }
      if (!this.message) {
        this.errormessage = true;
        valid = false;
      }
      if (valid === true) {
        this.disabled = true;
        this.loading = true;
        this.$store.dispatch('messages/send', { id: this.userID, message: this.message, subject: this.subject }).then((data) => {
          this.loading = false;
          this.disabled = false;
          if (data.status === true) {
            this.message = '';
            this.subject = '';
            this.msg = this.$t('msgsuccessfullysent');
          } else {
            this.msg = 'Error 505.';
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.sendmsg
  padding-top: 40px
  padding-bottom: 40px
  width: 100%
  max-width: 500px
  margin: 0 auto

  .ico
    margin-bottom: 24px

  .title
    font-size: 24px
    line-height: 24px
    color: #231F4D
    font-weight: 800
    font-family: 'Spartan', sans-serif
    margin-bottom: 40px

  .row
    margin-bottom: 20px

  .pl 
    margin-bottom: 10px
    color: #6b798b
    font-size: 14px
    font-weight: 600
    line-height: 14px

  .btnc
    align-items: center
    display: flex
    gap: 20px  
    justify-content: space-between  

</style>
