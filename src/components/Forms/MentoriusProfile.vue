<template lang="pug">
div.profile
  UserLoader(color="dark" v-if="loader")
  div.forma(v-else)
    div.title {{$t('user.typementorius')}}
    div.split
      div.divas
        div.kas {{$t('user.eiditdata')}}
        form
          div.row
            UserInput(v-bind:placeholder="$t('user.vardas')+'*'" v-model="firstName" type="input"
              v-on:click="submit"
              v-bind:error="errorfirstName" v-bind:disabled="disabled")
          div.row
            UserInput(v-bind:placeholder="$t('user.pavarde')+'*'" v-model="lastName" type="input"
              v-on:click="submit"
              v-bind:error="errorlastName" v-bind:disabled="disabled")
          div.row
            UserInput(v-bind:placeholder="$t('user.email')" v-model="email" type="input"
              v-on:click="submit"
              v-bind:error="false" v-bind:disabled="true")
          div.row
            UserInput(
              v-bind:placeholder="$t('user.phoneNumber')+'*'"
              v-model="phoneNumber"
              type="input"
              v-on:input="validatePhone"
              v-bind:error="errorPhoneNumber"
              v-bind:disabled="disabled"
            )
            p.error-message(v-if="errorPhoneNumber") {{$t('user.invalidPhoneNumber')}}
          div.row
            UserInput(v-bind:placeholder="$t('user.pareigosirimone')+'*'" v-model="pareigosirimone" type="input"
              v-on:click="submit"
              v-bind:error="errorpareigosirimone" v-bind:disabled="disabled")
          div.row
            UserInput(v-bind:placeholder="$t('user.pareigosirimone')+' EN ('+$t('user.neprivaloma')+')'" v-model="pareigosirimoneen" type="input"
              v-on:click="submit"
              v-bind:error="errorpareigosirimoneen" v-bind:disabled="disabled")
          div.row.sritys(v-if="tax" :class="{disabled:user.status ==='public' || disabled}")
            div.pl {{$t('vsritys')}}
            div.list
              div(v-for="item in tax" :class="{active:sritis.find(e=>e===item.id)}").item
                span.sritis-item(v-on:click="addactive(item.id)")
                  div
                    div.c
                      icon(:data="checkmarkData" width="10" height="8" color="#fff").check
                  div {{item.name}}
                UserPopper(v-if="item.description" trigger="clickToOpen" transition="fade" :options="{ placement: 'top-end', modifiers: { offset: { offset: '0,10px' } } }" :content="item.description")
                  div.popper-icon
                    div ?
          div.row
            div.pl {{$t('user.trunpasap')}}*
            TextAreaCounter(v-model="aprasymaslt" v-bind:max="1500" v-bind:disabled="disabled" v-bind:error="erroraprasymaslt")
          div.row
            div.pl {{$t('user.trunpasap')}} EN ({{$t('user.neprivaloma')}})
            TextAreaCounter(v-model="aprasymasen" v-bind:max="1500" v-bind:disabled="disabled" v-bind:error="erroraprasymasen")
          div.row
            UploadFile(type="file" text="" v-bind:btntext="$t('user.addcv')" v-model="cv" v-bind:action="'user/EditCv'" v-bind:deleteAction="'user/Deletecv'" v-bind:id="false" v-bind:editable="true")
          div.row
            UserInput(v-bind:placeholder="$t('user.linkedin')" v-model="linkedin" type="input"
              v-on:click="submit"
              v-bind:error="false" v-bind:disabled="disabled")
          div.row.aktyvi-paskyra(v-if="paskyrosUzimtumas")
            div.pl {{$t('vuzimtumas')}}
            div.list
              div(v-on:click="toggleActiveUzimtumas(paskyrosUzimtumas)" :class="{active : paskyrosUzimtumas === '1'}").active-profile
                div
                  div.c
                    icon(:data="checkmarkData" width="10" height="8" color="#fff").check
                div {{$t('vuzimtumasdesc')}}
          div.row.splitbtn
            div
              UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('user.save')" textAligin="center")
            div
              div.msg(v-if="msg") {{msg}}
      div.divas
        div(style="margin-bottom: 80px;")
          div.kas {{$t('user.editfoto')}}*
          AvataForm(v-bind:img="img")
        div.kas {{$t('user.eidtpassword')}}
        PasswordChange
</template>

<script>
import { mapGetters } from 'vuex';
import PasswordChange from '@/components/Forms/PasswordChange.vue';
import UploadFile from '@/components/Blocks/UploadFile.vue';
import AvataForm from '@/components/Forms/AvataForm.vue';
import UserPopper from "vue3-popper";
import checkmarkData from '@/assets/svg/checkmark.svg';
import UserLoader from '@/components/elements/Loader.vue';
import UserInput from '@/components/elements/Userinput.vue';
import TextAreaCounter from '@/components/elements/TextAreaCounter.vue';
import UserBtn from '@/components/elements/Btn.vue';


export default {

  name: 'MentoriusProfile',
  components: {
    PasswordChange,
    UploadFile,
    AvataForm,
    // eslint-disable-next-line comma-dangle
    UserPopper,
    UserLoader,
    UserInput,
    TextAreaCounter,
    UserBtn,
  },
  created() {
    this.$store.dispatch('MentoriaiDynamic/getTax').then(() => {
    });
    this.$store.dispatch('user/getProfile').then(() => {
      this.loader = false;
      this.firstName = this.profile.first_name;
      this.lastName = this.profile.last_name;
      this.email = this.profile.email;
      this.pareigosirimone = this.profile.pareigos_ir_imone;
      this.pareigosirimoneen = this.profile.pareigos_ir_imone_en;
      this.paskyrosUzimtumas = this.profile.paskyros_uzimtumas;
      this.sritis = [...this.profile.sritis];
      this.aprasymaslt = this.profile.aprasymas_lt;
      this.aprasymasen = this.profile.aprasymas_en;
      this.cv = this.profile.cv;
      this.linkedin = this.profile.linkedin;
      this.img = this.profile.img;
      this.phoneNumber = this.profile.phone_number; 
    });
  },
  data() {
    return {
      msg: '',
      cv: [],
      img: '',
      loader: true,
      errorfirstName: false,
      errorlastName: false,
      phoneNumber: '', 
      errorPhoneNumber: false, 
      errorpareigosirimone: false,
      errorpareigosirimoneen: false,
      pareigosirimoneen: '',
      pareigosirimone: '',
      firstName: '',
      lastName: '',
      email: '',
      aprasymaslt: '',
      aprasymasen: '',
      paskyrosUzimtumas: '',
      sritis: [],
      checkmarkData,
      erroraprasymaslt: false,
      erroraprasymasen: false,
      loading: false,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      profile: 'profile',
    }),
    ...mapGetters('MentoriaiDynamic', {
      tax: 'tax',
    }),
  },
  methods: {
    validatePhone() {
      const regex = /^[+]?[0-9]{0,15}$/; 
      if (!regex.test(this.phoneNumber)) {
        this.errorPhoneNumber = true;
        this.phoneNumber = this.phoneNumber.replace(/[^0-9+]/g, '');
      } else {
        this.errorPhoneNumber = false;
      }
    },
    submit() {
      this.msg = false;
      let valid = true;

      this.errorfirstName = false;
      this.errorlastName = false;
      this.errorpareigosirimone = false;
      this.erroraprasymaslt = false;
      this.errorPhoneNumber = false;

      if (!this.firstName) {
        this.errorfirstName = true;
        valid = false;
      }
      if (!this.lastName) {
        this.errorlastName = true;
        valid = false;
      }
      if (!this.pareigosirimone) {
        this.errorpareigosirimone = true;
        valid = false;
      }
      if (!this.aprasymaslt) {
        this.erroraprasymaslt = true;
        valid = false;
      }

      if (!this.phoneNumber || !/^[+]?[0-9]{9,15}$/.test(this.phoneNumber)) {
        this.errorPhoneNumber = true;
        valid = false;
      }
      if (valid) {
        this.loading = true;
        this.disabled = true;
        this.$store.dispatch('user/saveProfile', {
          firstName: this.firstName,
          lastName: this.lastName,
          pareigosirimone: this.pareigosirimone,
          pareigosirimoneen: this.pareigosirimoneen,
          sritis: this.sritis,
          paskyrosUzimtumas: this.paskyrosUzimtumas,
          aprasymaslt: this.aprasymaslt,
          aprasymasen: this.aprasymasen,
          linkedin: this.linkedin,
          phoneNumber: this.phoneNumber, 
        }).then((data) => {
          this.loading = false;
          this.disabled = false;
          this.msg = data.status ? this.$t('user.successfullsave') : this.$t('user.failsave');
        });
      }
    },
    addactive(id) {
      const index = this.sritis.findIndex((e) => e === id);
      if (index === -1) {
        this.sritis.push(id);
      } else {
        this.sritis.splice(index, 1);
      }
    },
    toggleActiveUzimtumas() {
      if (this.paskyrosUzimtumas === '1') {
        this.paskyrosUzimtumas = '0';
      } else {
        this.paskyrosUzimtumas = '1';
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.error-message
  color: red
  font-size: 12px
  margin-top: 5px

:deep(.popper)
  width: 340px !important
  background-color: #ffffff !important
  transform: translate(617px, 604px) !important
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important
  padding-top: 2rem
  padding-bottom: 2rem
  padding-left: 1rem
  padding-right: 1rem
  color: #6B798B

  div
    strong
      color: #231F4D
      font-weight: 700
      display: block

  @media(max-width: 400px)
    width: auto

.popper-icon
  display: inline-flex
  border: 1px solid #304EA4
  border-radius: 99px
  width: 16px
  height: 16px
  align-items: center
  justify-content: center
  font-size: 12px
  cursor: pointer
  margin-left: 0.5rem

  div
    font-weight: 700
    color: #304EA4
    font-size: 10px

.profile
  width: 100%

  .splitbtn
    align-items: center
    display: flex
    gap: 20px
    flex-wrap: wrap

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
    gap: 120px
    
    .divas 
      width: 50%
    
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

  .sritys
    &.disabled
      opacity: 0.9
      

      .list .item .c
        opacity: 0.5

    .list
      font-size: 14px
      line-height: 20px
      color: #6B798B
      flex-wrap: wrap
      padding: 30px 15px
      background-color: #F2F5F9
      border-radius: 4px
      display: flex

      @media(max-width: 600px)
        gap: 10px

      .sritis-item
        display: inline-flex
        cursor: pointer
        position: relative

        .sritis-tooltip
          position: absolute
          right: 0
          top: 10px
          background: #fff
          padding: 2rem

      .item
        user-select: none
        display: flex
        width: calc(49.995% - 15px)

        .c
          margin-right: 0.5rem
          transition: 0.2s all
          align-items: center
          justify-content: center
          display: flex
          width: 18px
          height: 18px
          border: 1px solid #DDE9F6
          background-color: #fff

        &.active
          .c
            background-color: #5A98C8

  .aktyvi-paskyra
    &.disabled
      opacity: 0.9
      pointer-events: none

      .list .item .c
        opacity: 0.5

    .list
      font-size: 14px
      line-height: 20px
      color: #6B798B
      flex-wrap: wrap
      padding: 30px 15px
      background-color: #F2F5F9
      border-radius: 4px
      display: flex
      gap: 10px

    .active-profile
      user-select: none
      cursor: pointer
      display: flex
      gap: 10px

      .c
        transition: 0.2s all
        align-items: center
        justify-content: center
        display: flex
        width: 18px
        height: 18px
        border: 1px solid #DDE9F6
        background-color: #fff

      &.active
        .c
          background-color: #5A98C8

</style>
