<template lang="pug">
  div.form
    div.row
      UserInput(
        v-bind:placeholder="$t('user.email')"
        v-model:modelValue="email"
        type="input"
        @blur="validateEmail"
        v-bind:error="errorEl"
        v-bind:disabled="false"
      )
    div.row
      UserInput(
        v-bind:placeholder="$t('user.password')"
        v-model:modelValue="password"
        type="password"
        @blur="validatePassword"
        v-bind:error="errorPass"
        v-bind:disabled="false"
      )
    div.btnc
      div
        UserBtn(
          v-bind:active="false"
          v-on:click="submit"
          color="blue"
          v-bind:disabled="isLoading"
          v-bind:loading="loading"
          v-bind:uppercase="false"
          v-bind:text="$t('user.login')"
          textAlign="center"
        )
    div.soc-login
      div.or {{$t('user.or')}} 
      div.list
        div
          UserBtn(
            v-bind:active="false"
            v-on:click="loginOauth('facebook')"
            color="blue"
            v-bind:disabled="loading || loadingln || loadinggo"
            v-bind:loading="loadingfa"
            v-bind:uppercase="false"
            text=""
            textAlign="center"
          ).facebook
            template(#left)
              icon(:data="faData" color="#fff" width="6" height="12")
        div
          UserBtn(
            v-bind:active="false"
            v-on:click="loginOauth('linkedin')"
            color="blue"
            v-bind:disabled="loading || loadingfa || loadinggo"
            v-bind:loading="loadingln"
            v-bind:uppercase="false"
            text=""
            textAlign="center"
          )
            template(#left)
              icon(:data="lnData" color="#fff" width="12" height="12")
        div
          UserBtn(
            v-bind:active="false"
            v-on:click="loginOauth('google')"
            color="blue"
            v-bind:disabled="loading || loadingfa || loadingln"
            v-bind:loading="loadinggo"
            v-bind:uppercase="false"
            text=""
            textAlign="center"
          ).google
            template(#left)
              icon(:data="googleData" color="#fff" width="12" height="12")
    div.pamirsote
      router-link(v-bind:to="{name: 'LostPassword'}" active-class="active") {{$t('user.fpassword')}}
    div(v-if="msg").msg {{msg}}
  </template>
  
  <script>
  import UserInput from '@/components/elements/Userinput.vue';
  import UserBtn from '@/components/elements/Btn.vue';
  import isEmail from 'validator/lib/isEmail';
  import faData from '@/assets/svg/fa.svg';
  import lnData from '@/assets/svg/ln.svg';
  import googleData from '@/assets/svg/google.svg';
  
  export default {
    name: 'LoginForm',
    components: {
      UserInput,
      UserBtn,
    },
    data() {
      return {
        faData,
        lnData,
        googleData,
        email: '',
        password: '',
        errorEl: false,
        errorPass: false,
        msg: false,
        loading: false,
        loadingfa: false,
        loadingln: false,
        loadinggo: false,
      };
    },
    computed: {
      isLoading() {
        return this.loading || this.loadingfa || this.loadingln || this.loadinggo;
      }
    },
    created() {
      if (this.$route.query?.error) {
        if (this.$route.query.error === 'existing_user_login') {
          this.msg = this.$t('oauth.existing_user_login');
        }
        if (this.$route.query.error === 'empty_user_login') {
          this.msg = this.$t('oauth.empty_user_login');
        }
      }
    },
    methods: {
      validateEmail() {
        this.errorEl = !isEmail(this.email);
      },
      validatePassword() {
        this.errorPass = !this.password.trim() || this.password.length < 6;  
      },
      async submit() {
        await this.$recaptchaLoaded();
        const token = await this.$recaptcha('login');
        console.log(token);

        this.msg = false;
  
        if (this.errorEl || this.errorPass) {
          this.msg = this.errorEl ? this.$t('user.incorectemail') : this.$t('user.password_required');
          return;
        }
  
        this.loading = true;
  
        await this.$store
          .dispatch('user/logIn', { email: this.email, password: this.password, recaptchaToken: token })
          .then((rsp) => {
            this.loading = false;
            if (!rsp.status) {
              switch (rsp.errorCode) {
                case 'incorrect_password':
                  this.msg = this.$t('user.incorectempass');
                  break;
                case 'draft':
                  this.msg = this.$t('user.account_not_confirmed');
                  break;
                default:
                  this.msg = this.$t('Neteisingi duomenys');
                  break;
              }
            } else {
              this.$router.push({ name: 'Messages' });
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response && error.response.data && error.response.data.message) {
              this.msg = error.response.data.message;
            } else {
              this.msg = this.$t('Serverio klaida');
            }
          });
      },
      loginOauth(provider) {
        this.msg = false;
        this[`loading${provider}`] = true;
  
        this.$store
          .dispatch('user/getOauthRedirect', { type: provider, usertype: 0 })
          .then((rsp) => {
            if (rsp) {
              window.open(rsp, '_self');
            } else {
              this.loadingfa = false;
              this.loadingln = false;
              this.loadinggo = false;
              this.msg = `${this.$t('oauth.error')} ${provider}`;
            }
          })
          .catch((error) => {
            this.loadingfa = false;
            this.loadingln = false;
            this.loadinggo = false;
            console.error('OAuth error:', error);
            this.msg = `${this.$t('oauth.error')} ${provider}`;
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
  
    .btnc
      display: block
  
      .btn
        width: 100%
        max-width: 100%
  
    .soc-login
      .or
        font-size: 12px
        line-height: 12px
        color: #6B798B
        text-align: center
        margin-top: 20px
        margin-bottom: 10px
  
      .list
        display: flex
        justify-content: space-between
        flex-wrap: wrap

        div
          width: calc(33.33% - 13.33333px); 
          box-sizing: border-box; 
          margin-right: 20px;

          &:last-child
            margin-right: 0;
        @media(max-width: 600px)
          gap: 10px
          flex-wrap: wrap
  
        .btn
          width: 100%
          max-width: 100%
  
        .btn .leftico
          margin-right: 0
  
        .facebook
          background-color: #3B5998
  
        .google
          background-color: #DC4E41
  
    .pamirsote
      margin-top: 15px
  
      a
        text-decoration: underline
  
    .msg
      margin-top: 15px
      color: red
  
      a
        text-decoration: underline
  </style>
  