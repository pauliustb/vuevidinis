<template lang="pug">
  div.form
    div.row
      UserInput(v-bind:placeholder="$t('user.email')" v-bind:value="email" v-on:update:value="updateEmail" type="input"
        v-on:click="submit"
        v-bind:error="false" v-bind:disabled="true")
    div.row
      UserInput(v-bind:placeholder="$t('user.password')" v-bind:value="password" v-on:update:value="updatePassword" type="password"
        v-on:click="submit"
        v-bind:error="errorPass" v-bind:disabled="loading")
    div.row
      UserInput(v-bind:placeholder="$t('user.cpassword')" v-bind:value="password2" v-on:update:value="updatePassword2" type="password"
        v-on:click="submit"
        v-bind:error="errorPass2" v-bind:disabled="loading")
    div.btnc 
      div
        UserBtn(v-bind:active="false" v-on:click="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('user.save')" textAligin="center")
      div(v-if="msg" v-html="msg").msg
  </template>
  
  <script>
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';

  export default {
    name: 'LostPasswordRestForm',
    props: ['email', 'resetkey'],
    components: {
      UserInput,
      UserBtn
  },
    data() {
      return {
        password: '',
        password2: '',
        errorPass: false,
        errorPass2: false,
        msg: false,
      };
    },
    methods: {
      submit() {
        this.msg = false;
        this.errorPass = false;
        this.errorPass2 = false;
        let valid = true;
        if (!this.password) {
          this.errorPass = true;
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
          this.$store.dispatch('User/restPassConfirm', { email: this.email, password: this.password, key: this.resetkey }).then((rsp) => {
            this.loading = false;
            if (rsp.status === true) {
              this.msg = this.$t('password_changed');
              setTimeout(() => {
                this.$router.push({ name: 'Login' });
              }, 2000);
            } else {
              this.msg = 'Error';
            }
          });
        }      
      },
      updateEmail(value) {
        this.$emit('update:email', value); // Emit the updated email to the parent component
      },
      updatePassword(value) {
        this.password = value; // Update the local data variable
      },
      updatePassword2(value) {
        this.password2 = value; // Update the local data variable
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

  .msg
    color: red

</style>
  