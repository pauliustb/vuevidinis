<template lang="pug">
div.form
  div.row
    UserInput(v-bind:placeholder="$t('user.password')" v-model="password" type="password"
      v-on:click="submit"
      v-bind:error="errorPass" v-bind:disabled="false")
  div.row
    UserInput(v-bind:placeholder="$t('user.cpassword')" v-model="password2" type="password"
      v-on:click="submit"
      v-bind:error="errorPass2" v-bind:disabled="false")
  div.btnc 
    div
      UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('user.save')" textAligin="center")
    div
      div.msg(v-if="msg") {{msg}}
</template>

<script>
import isLength from 'validator/lib/isLength';
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';

export default {

  name: 'PasswordChange',
  components: {
    UserInput,
    UserBtn
  },
  created() {
  },
  data() {
    return {
      password: '',
      password2: '',
      errorPass: false,
      errorPass2: false,
      loading: false,
      msg: '',
    };
  },
  computed: {
  },
  methods: {
    submit() {
      let valid = true;
      this.errorPass = false;
      this.errorPass2 = false;
      this.msg = false;
      if (!this.password) {
        this.errorPass = true;
        valid = false;
      }
      if (!isLength(this.password, { min: 5, max: 20 })) {
        this.errorPass = 'Min: 5, Max: 20';
        valid = false;
      }
      if (!this.password2) {
        this.errorPass2 = true;
        valid = false;
      }
      if (this.password !== this.password2) {
        this.errorPass = true;
        this.errorPass2 = true;
        valid = false;
      }
      if (valid) {
        this.loading = true;
        this.$store.dispatch('user/changePass', this.password).then((rsp) => {
          this.loading = false;
          if (rsp.status === true) {
            this.msg = this.$t('user.successfullsave');
          } else {
            this.msg = this.$t('user.failsave');
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.form
  width: 100%

  .row
    margin-bottom: 15px

  .btnc
    display: flex
    align-items: center
    gap: 20px
    flex-wrap: wrap

    @media(max-width: 600px)
      flex-direction: column

</style>
