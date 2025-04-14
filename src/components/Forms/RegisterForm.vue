<template lang="pug">
div.form
  div.row
    div.name {{$t('registerpage.registerwith')}}
  div.row
    div.list
      div
        UserBtn(v-bind:active="false" v-on:click="loginOauth('facebook')" color="blue" v-bind:disabled="loading || loadingln || loadinggo" v-bind:loading="loadingfa" v-bind:uppercase="false" text="" textAligin="center").facebook
          template(#left)
            icon(:data="faData" color="#fff" width="6" height="12")
      div
        UserBtn(v-bind:active="false" v-on:click="loginOauth('linkedin')" color="blue" v-bind:disabled="loading || loadingfa || loadinggo" v-bind:loading="loadingln" v-bind:uppercase="false" text="" textAligin="center")
          template(#left)
            icon(:data="lnData" color="#fff" width="12" height="12")
      div
        UserBtn(v-bind:active="false" v-on:click="loginOauth('google')" color="blue" v-bind:disabled="loading || loadingfa || loadingln" v-bind:loading="loadinggo" v-bind:uppercase="false" text="" textAligin="center").google
          template(#left)
            icon(:data="googleData" color="#fff" width="12" height="12")
      div(v-if="msgoauth" v-html="msgoauth").msg
  div.row
    div.name {{$t('registerpage.uzpildykiteforma')}}
  div.row
    UserInput(v-bind:placeholder="$t('user.email')" v-model="email" type="input"
      v-on:click="submit"
      v-bind:error="errorEl" v-bind:disabled="loading")
  div.row
    UserInput(v-bind:placeholder="$t('user.password')" v-model="password" type="password"
      v-on:click="submit"
      v-bind:error="errorPass" v-bind:disabled="loading")
  div.row
    UserInput(v-bind:placeholder="$t('user.cpassword')" v-model="password2" type="password"
      v-on:click="submit"
      v-bind:error="errorPass2" v-bind:disabled="loading")
  div.row
    UserChekbox(v-model="sutinkuforma" dir="left" :placeholder="$t('user.iagre')" :error="sutinkuformaError")
  div.row
    UserChekbox(v-model="sutinkuforma2" dir="left" :placeholder="$t('user.iagre2')" :error="sutinkuformaError2")
  div.btnc
    UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('register')" textAligin="center")
  div(v-if="msg" v-html="msg").msg
</template>

<script>
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserChekbox from '@/components/elements/Chekbox.vue';
import faData from '@/assets/svg/fa.svg'
import lnData from '@/assets/svg/ln.svg'
import googleData from '@/assets/svg/google.svg'


export default {

  name: 'RegisterForm',
  props: ['type'],
  components: {
    UserInput,
    UserBtn,
    UserChekbox
  },
  created() {
    if (this.$route.query && this.$route.query.error) {
      if (this.$route.query.error === 'existing_user_login') {
        this.msgoauth = this.$t('oauth.existing_user_login');
      }
      if (this.$route.query.error === 'empty_user_login') {
        this.msgoauth = this.$t('oauth.empty_user_login');
      }
    }
  },
  data() {
    return {
      faData,
      lnData,
      googleData,
      msgoauth: false,
      errorEl: false,
      errorPass: false,
      errorPass2: false,
      email: '',
      password: '',
      password2: '',
      loading: false,
      loadingfa: false,
      loadingln: false,
      loadinggo: false,
      msg: false,
      sutinkuforma: false,
      sutinkuformaError: false,
      sutinkuforma2: false,
      sutinkuformaError2: false,
    };
  },
  computed: {
  },
  methods: {
    submit() {
      this.msgoauth = false;
      this.msg = false;
      this.errorPass = false;
      this.errorPass2 = false;
      this.errorEl = false;
      let valid = true;
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

      if (!this.sutinkuforma) {
        this.sutinkuformaError = true;
        valid = false;
      }

      if (!this.sutinkuforma2) {
        this.sutinkuformaError2 = true;
        valid = false;
      }

      if (!isEmail(this.email)) {
        this.errorEl = true;
        valid = false;
      }
      if (valid) {
        this.loading = true;
        this.$store.dispatch('user/register', { email: this.email, password: this.password, type: this.type }).then((rsp) => {
          this.loading = false;
          if (rsp.status === false) {
            this.msg = rsp.msg;
          } else {
            this.$emit('Userregister');
            // logged in auto redirect
          }
        });
      }
    },
    loginOauth(provider) {
      this.msgoauth = false;
      this.msg = false;
      if (provider === 'facebook') {
        this.loadingfa = true;
      }
      if (provider === 'linkedin') {
        this.loadingln = true;
      }
      if (provider === 'google') {
        this.loadinggo = true;
      }
      this.$store.dispatch('user/getOauthRedirect', { type: provider, usertype: this.type }).then((rsp) => {
        if (rsp) {
          window.open(rsp, '_self');
        } else {
          this.loadingfa = false;
          this.loadingln = false;
          this.loadinggo = false;
          this.msg = `Oauth error: ${provider}`;
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.form
  width: 100%

  .row
    margin-bottom: 15px

  .name
    font-size: 14px
    line-height: 14px
    color: #6B798B

  .btnc
    margin-top: 20px
    display: flex
    align-items: center
    width: 100%

    .btn
      width: 100%
      max-width: 100%

  .msg
    color: red

  .list
    display: flex
    flex-wrap: wrap
    justify-content: space-between;
    margin-bottom: 30px

    div
      width: calc(33.33% - 13.33333px); 
      box-sizing: border-box; 
      margin-right: 20px;

      &:last-child
        margin-right: 0;

    @media(max-width: 600px)
      flex-wrap: wrap
      gap: 10px

    .btn
      width: 100%
      max-width: 100%

    .btn .leftico
      margin-right: 0

  .facebook
    background-color: #3B5998

  .google
    background-color: #DC4E41


</style>
