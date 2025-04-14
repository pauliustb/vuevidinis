<template lang="pug">
  div.profile
    UserLoader(color="dark" v-if="loader")
    div.forma(v-else)
      div.title {{$t('user.typeUser')}}
      div.split
        div.splitas
          div.kas {{$t('user.eiditdata')}}
          form
            div.row
              UserInput(v-bind:placeholder="$t('user.vardas')+'*'" v-model="firstName" type="input"
                v-on:click="submit"
                v-bind:error="errorfirstName" v-bind:disabled="localDisabled")
            div.row
              UserInput(v-bind:placeholder="$t('user.pavarde')+'*'" v-model="lastName" type="input"
                v-on:click="submit"
                v-bind:error="errorlastName" v-bind:disabled="localDisabled")
            div.row
              UserInput(v-bind:placeholder="$t('user.email')" v-model="email" type="input"
                v-on:click="submit"
                v-bind:error="false" v-bind:disabled="true")
            div.row
              UserInput(v-bind:placeholder="$t('user.ipavadinimas')+'*'" v-model="pavadinimas" type="input"
                v-on:click="submit"
                v-bind:error="pavadinimasError" v-bind:disabled="localDisabled")
            div.row
              UserInput(v-bind:placeholder="$t('user.regMetai')+'*'" v-model="regMetai" type="input"
                v-on:click="submit"
                v-bind:error="regMetaiError" v-bind:disabled="localDisabled")
            div.row
              div.pl {{$t('user.veiklosSritis')}}*
              TextAreaCounter(v-model="veiklosSritis" v-bind:max="1500" v-bind:disabled="localDisabled" v-bind:error="veiklosSritisError")
            div.row
              div.pl {{$t('user.klausimai')}}*
              TextAreaCounter(v-model="klausimai" v-bind:max="1500" v-bind:disabled="localDisabled" v-bind:error="klausimaiError")
            div.row.splitbtn
              div
                UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('user.save')" textAligin="center")
              div
                div.msg(v-if="msg") {{msg}}
        div.splitas2
          div(style="margin-bottom: 80px;")
            div.kas {{$t('user.editfoto')}}
            AvataForm(v-bind:img="img")
          div.kas {{$t('user.eidtpassword')}}
          PasswordChange
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import PasswordChange from '@/components/Forms/PasswordChange.vue';
  import AvataForm from '@/components/Forms/AvataForm.vue';
  import UserInput from '@/components/elements/Userinput.vue';
  import UserBtn from '@/components/elements/Btn.vue';
  import TextAreaCounter from '@/components/elements/TextAreaCounter.vue';
  import UserLoader from '@/components/elements/Loader.vue';
  
  export default {
  
    name: 'UserProfile',
    components: {
      PasswordChange,
      AvataForm,
      UserInput,
      UserBtn,
      UserLoader,
      TextAreaCounter
    },
    props: ['disabled', 'modelValue', 'max', 'error'],
    data() {
      return {
        msg: '',
        cv: [],
        img: '',
        loader: true,
        errorfirstName: false,
        errorlastName: false,
        pavadinimas: '',
        pavadinimasError: false,
        regMetai: '',
        regMetaiError: false,
        // veiklosSritis: '',
        veiklosSritisError: false,
        // klausimai: '',
        klausimaiError: false,
        firstName: '',
        lastName: '',
        email: '',
        loading: false,
        localDisabled: this.disabled 
      };
    },
    computed: {
      ...mapGetters('User', {
        user: 'user',
        profile: 'profile',
      }),
      profileData() {
        const profile = this.$store.getters['user/profile'] || {};
        return profile;
      },
    },
    watch: {
      profileData: {
        immediate: true,
        handler(newProfile) {
          if (newProfile && Object.keys(newProfile).length > 0) {
            this.firstName = newProfile.first_name || '';
            this.lastName = newProfile.last_name || '';
            this.email = newProfile.email || '';
            this.pavadinimas = newProfile.imones_pavadinimas || '';
            this.regMetai = newProfile.imones_veiklosregistracijos_metai || '';
            this.veiklosSritis = newProfile.apibudinkite_imonesveiklos_sriti || '';
            this.klausimai = newProfile.klausimaireikalinga_pagalba || '';
            this.img = newProfile.img || '';
            this.loader = false;
          }
        }
      }
    },
    created() {
      this.$store.dispatch('user/getProfile');
    },
    methods: {
      submit() {
        this.msg = false;
        let valid = true;
        this.errorfirstName = false;
        this.errorlastName = false;
        this.pavadinimasError = false;
        this.regMetaiError = false;
        this.veiklosSritisError = false;
        this.klausimaiError = false;
        if (!this.firstName) {
          this.errorfirstName = true;
          valid = false;
        }
        if (!this.lastName) {
          this.errorlastName = true;
          valid = false;
        }
  
        if (!this.pavadinimas) {
          this.pavadinimasError = true;
          valid = false;
        }
        if (!this.regMetai) {
          this.regMetaiError = true;
          valid = false;
        }
        if (!this.veiklosSritis) {
          this.veiklosSritisError = true;
          valid = false;
        }
        if (!this.klausimai) {
          this.klausimaiError = true;
          valid = false;
        }
  
        if (valid) {
          this.loading = true;
          this.localDisabled = true; 
          this.$store.dispatch('user/saveProfile', {
            firstName: this.firstName,
            lastName: this.lastName,
            pavadinimas: this.pavadinimas,
            regMetai: this.regMetai,
            veiklosSritis: this.veiklosSritis,
            klausimai: this.klausimai,
          }).then((data) => {
            this.loading = false;
            this.localDisabled = false; 
            if (data.status === true) {
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
.profile
  width: 100%

  .splitbtn
    align-items: center
    display: flex
    gap: 20px  
    flex-direction: row  
    
  .title
    letter-spacing: -1px
    font-family: 'Spartan', sans-serif
    font-size: 36px
    line-height: 36px
    color: #231F4D
    font-weight: 800
    margin-bottom: 30px

  .split
    display: flex  
    flex-direction: row  
    
    .splitas 
      width 50%

    .splitas2 
      width 50%
      margin-left 120px
    @media(max-width: 1024px)
      flex-wrap: wrap
      gap: 80px  
    
    .kas
      letter-spacing: -0.5px
      font-family: 'Spartan', sans-serif
      font-size: 16px
      line-height: 16px
      font-weight: 700
      color: #231F4D
      margin-bottom: 50px
      
      @media(max-width: 1024px)
        margin-bottom: 20px
    
    .row
      margin-bottom: 15px

  .pl
    margin-bottom: 10px
    color: #6b798b
    font-size: 14px
    font-weight: 600
    line-height: 14px

</style>
