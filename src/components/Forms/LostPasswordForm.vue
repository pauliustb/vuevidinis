<template lang="pug">
div.form
  div.row
    UserInput(v-bind:placeholder="$t('user.email')" v-model="email" type="input"
      v-on:click="submit"
      v-bind:error="errorEl" v-bind:disabled="false")
  div.btnc 
    div
      UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('user.remind')" textAligin="center")
  div(v-if="msg" v-bind:style="{color:color}").msg {{msg}}
</template>

<script>
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';
import isEmail from 'validator/lib/isEmail';

export default {

  name: 'LostPasswordForm',
  components: {
    UserInput,
    UserBtn,
  },
  created() {
    
  },
  data() {
    return {
      errorEl: false,
      email: '',
      msg: false,
      loading: false,
      color: false,
    };
  },
  computed: {
  },
  methods: {
    submit() {
      this.msg = false;
      this.errorEl = false;
      let valid = true;
      if (!isEmail(this.email)) {
        this.errorEl = true;
        valid = false;
      }
      if (valid) {
        this.loading = true;
        this.$store.dispatch('user/lostPass', { email: this.email }).then((rsp) => {
          this.loading = false;
          if (rsp.status === false) {
            this.color = 'red';
            this.msg = this.$t('user.cannotbefound');
          } else {
            this.color = 'green';
            this.msg = this.$t('user.successfullysent');
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.form
  width 100%
  .row
    margin-bottom 15px;
  .btnc
    display block
    >>>.btn 
      width 100%
      max-width 100%
  .msg
    margin-top 15px
    color red
    >>>a
      text-decoration underline
</style>
